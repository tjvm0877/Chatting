package com.hello.chatting.global.websocket;

import java.io.IOException;
import java.time.Instant;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hello.chatting.domain.chat.application.ChatService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class CustomWebsocketHandler extends TextWebSocketHandler {

	private final ObjectMapper objectMapper;
	private final SessionManager sessionManager;
	private final ChatService chatService;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessionManager.registerSession(session);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		// 1. 메시지 파싱
		InMessage inMessage = objectMapper.readValue(message.getPayload(), InMessage.class);

		// 2. 메시지의 Command에 따른 동작 구현
		switch (inMessage.command()) {
			// 2.1 CONNECT - 인증
			case CONNECT -> handleConnect(session, inMessage);

			// 2.2 SEND - Destination 브로드 캐스트
			case SEND -> handleChatMessage(session, inMessage);

			// 2.3 SUBSCRIBE - 구독
			case SUBSCRIBE -> handleSubscribe(session, inMessage);

			// 2.4 UNSUBSCRIBE - 구독 취소
			case UNSUBSCRIBE -> sessionManager.unsubscribe(session.getId(), inMessage.destination());
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessionManager.removeSession(session);
	}

	private void handleSubscribe(WebSocketSession session, InMessage inMessage) throws IOException {
		try {
			if (chatService.isJoinedMember(inMessage.destination(), inMessage.sender())) {
				sessionManager.subscribe(session.getId(), inMessage.destination());
			}
		} catch (Exception e) {
			sendErrorMessage(session, "채팅방 입장 실패");
		}
		log.info("handleSubscribe success");
	}

	private void handleConnect(WebSocketSession session, InMessage inMessage) throws IOException {
		boolean authenticated = sessionManager.authenticateSession(session.getId(), inMessage.content());
		if (!authenticated) {
			sendErrorMessage(session, "인증 실패");
		}
		log.info("handleConnect success");
	}

	private void handleChatMessage(WebSocketSession session, InMessage inMessage) throws IOException {
		if (!chatService.isJoinedMember(inMessage.destination(), inMessage.sender())) {
			return;
		}
		Instant now = Instant.now();
		OutMessage outMessage = new OutMessage(ServerCommand.MESSAGE, inMessage.destination(), inMessage.sender(),
			inMessage.content(), now);
		String textOutMessage = objectMapper.writeValueAsString(outMessage);

		try {
			chatService.saveMessage(inMessage.destination(), inMessage.sender(), inMessage.content(), now);
		} catch (Exception e) {
			return;
		}

		sessionManager.getChatMembers(inMessage.destination())
			.forEach(chatMemberSession ->
				{
					try {
						chatMemberSession.sendMessage(new TextMessage(textOutMessage));
					} catch (IOException e) {
						log.error("메시지 전송 실패: {}", e.getMessage());
					}
				}
			);
		log.info("handleChatMessage success");
	}

	private void sendErrorMessage(WebSocketSession session, String errorMessage) throws IOException {
		OutMessage outMessage = new OutMessage(ServerCommand.ERROR, null, null, errorMessage, Instant.now());
		String textOutMessage = objectMapper.writeValueAsString(outMessage);
		session.sendMessage(new TextMessage(textOutMessage));
	}
}
