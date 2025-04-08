package com.hello.chatting.global.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.hello.chatting.domain.chat.application.ChatService;
import com.hello.chatting.global.jwt.JwtProvider;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomMessageBroker implements MessageBroker {

	private final Map<Long, List<String>> subscriptionRegistry = new ConcurrentHashMap<>();
	private final Map<String, SessionInfo> sessions = new ConcurrentHashMap<>();
	private final Map<String, WebSocketSession> pendingSessions = new ConcurrentHashMap<>();

	private final JwtProvider jwtProvider;
	private final ChatService chatService;

	@Override
	public boolean auth(String sessionId, String token) {
		if (!jwtProvider.isValidToken(token)) {
			return false;
		}

		WebSocketSession session = pendingSessions.remove(sessionId);
		if (session == null) {
			return false;
		}
		Long memberId = jwtProvider.getMemberIdFromToken(token);
		sessions.put(sessionId, new SessionInfo(session, memberId));
		return true;
	}

	@Override
	public void subscribe(String sessionId, Long topic) {
		if (!isAuthorizationSession(sessionId)) {
			return;
		}

		if (!chatService.isChatExist(topic)) {
			try {
				sessions.get(sessionId).session.sendMessage(new TextMessage("채팅방이 없음"));
				return;
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}

		if (!chatService.isChatMember(topic, sessions.get(sessionId).getMemberId())) {
			try {
				sessions.get(sessionId).session.sendMessage(new TextMessage("채팅방에 참여한 유저가 아님"));
				return;
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}

		subscriptionRegistry.computeIfAbsent(topic, key -> new ArrayList<>()).add(sessionId);
		sessions.get(sessionId).addTopic(topic);
	}

	@Override
	public void unsubscribe(String sessionId, Long topic) {
		if (isAuthorizationSession(sessionId)) {
			return;
		}

		subscriptionRegistry.get(topic).remove(sessionId);
		sessions.get(sessionId).getSubscribeTopics().remove(topic);
	}

	@Override
	public void publish(String sessionId, Long topic, String message) {
		if (isAuthorizationSession(sessionId) && !subscriptionRegistry.get(topic).contains(sessionId)) {
			return;
		}

		subscriptionRegistry.getOrDefault(topic, Collections.emptyList())
			.forEach(subscriberId -> {
				try {
					sessions.get(subscriberId).getSession().sendMessage(new TextMessage(message));
				} catch (IOException e) {
					e.printStackTrace(); // TODO: 예외 처리 변경
				}
			});

		// 채팅방 기록 저장
		chatService.saveMessageLog(topic, sessions.get(sessionId).getMemberId(), message);
	}

	@Override
	public void addSession(WebSocketSession session) {
		pendingSessions.put(session.getId(), session);
	}

	@Override
	public void removeSession(String sessionId) {
		if (pendingSessions.containsKey(sessionId)) {
			pendingSessions.remove(sessionId);
			return;
		}
		SessionInfo sessionInfo = sessions.remove(sessionId);
		sessionInfo.getSubscribeTopics().forEach(subscribeTopic -> {
			subscriptionRegistry.get(subscribeTopic).remove(sessionId);
			if (subscriptionRegistry.get(subscribeTopic).isEmpty()) {
				subscriptionRegistry.remove(subscribeTopic);
			}
		});
	}

	private boolean isAuthorizationSession(String sessionId) {
		return sessions.containsKey(sessionId);
	}

	@Getter
	private class SessionInfo {
		WebSocketSession session;
		Long memberId;
		List<Long> subscribeTopics;

		SessionInfo(WebSocketSession session, Long memberId) {
			this.session = session;
			this.memberId = memberId;
			this.subscribeTopics = new ArrayList<>();
		}

		void addTopic(Long topic) {
			subscribeTopics.add(topic);
		}

		void removeTopic(Long topic) {
			subscribeTopics.remove(topic);
		}
	}
}
