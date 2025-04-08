package com.hello.chatting.global.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.hello.chatting.global.jwt.JwtProvider;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomMessageBroker implements MessageBroker {

	private final Map<String, List<String>> subscriptionRegistry = new ConcurrentHashMap<>();
	private final Map<String, SessionInfo> sessions = new ConcurrentHashMap<>();
	private final Map<String, WebSocketSession> pendingSessions = new ConcurrentHashMap<>();

	private final JwtProvider jwtProvider;

	@Override
	public boolean auth(String sessionId, String token) {
		if (!jwtProvider.isValidToken(token)) {
			return false;
		}

		WebSocketSession session = pendingSessions.remove(sessionId);
		if (session == null) {
			return false;
		}

		sessions.put(sessionId, new SessionInfo(session));
		return true;
	}

	@Override
	public void subscribe(String sessionId, String topic) {
		if (!isAuthorizationSession(sessionId)) {
			return;
		}
		subscriptionRegistry.computeIfAbsent(topic, key -> new ArrayList<>()).add(sessionId);
		sessions.get(sessionId).addTopic(topic);
	}

	@Override
	public void unsubscribe(String sessionId, String topic) {
		if (isAuthorizationSession(sessionId)) {
			return;
		}
		subscriptionRegistry.get(topic).remove(sessionId);
		sessions.get(sessionId).getSubscribeTopics().remove(topic);
	}

	@Override
	public void publish(String sessionId, String topic, String message) {
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
		List<String> subscribeTopics;

		SessionInfo(WebSocketSession session) {
			this.session = session;
			this.subscribeTopics = new ArrayList<>();
		}

		void addTopic(String topic) {
			subscribeTopics.add(topic);
		}

		void removeTopic(String topic) {
			subscribeTopics.remove(topic);
		}
	}
}
