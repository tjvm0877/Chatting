package com.hello.chatting.global.websocket;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class CustomWebsocketHandler extends TextWebSocketHandler {

	private final MessageBroker messageBroker;
	private final ObjectMapper objectMapper;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		messageBroker.addSession(session);
	}

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		MessageFrame messageFrame = objectMapper.readValue(message.getPayload(), MessageFrame.class);

		switch (messageFrame.getType()) {
			case AUTH -> messageBroker.auth(session.getId(), messageFrame.getBody());
			case SUBSCRIBE -> messageBroker.subscribe(session.getId(), messageFrame.getDestination());
			case PUBLISH ->
				messageBroker.publish(session.getId(), messageFrame.getDestination(), messageFrame.getBody());
			case UNSUBSCRIBE -> messageBroker.unsubscribe(session.getId(), messageFrame.getDestination());
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		messageBroker.removeSession(session.getId());
	}
}
