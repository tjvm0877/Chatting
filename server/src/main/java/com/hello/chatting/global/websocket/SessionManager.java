package com.hello.chatting.global.websocket;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.WebSocketSession;

import com.hello.chatting.global.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SessionManager {

	private final JwtProvider jwtProvider;

	private final Map<String, WebSocketSession> pendingSessions = new ConcurrentHashMap<>();
	private final Map<String, UserSession> authenticatedSessions = new ConcurrentHashMap<>();
	private final Map<UUID, Set<String>> chatSessions = new ConcurrentHashMap<>();

	public void registerSession(WebSocketSession session) {
		pendingSessions.put(session.getId(), session);
	}

	public boolean authenticateSession(String sessionId, String token) {
		if (!jwtProvider.isValidToken(token)) {
			return false;
		}

		UUID memberPublicId = jwtProvider.getMemberUuidFromToken(token);
		WebSocketSession session = pendingSessions.remove(sessionId);
		authenticatedSessions.put(sessionId, new UserSession(session, memberPublicId));
		return true;
	}

	public void removeSession(WebSocketSession session) {
		String sessionId = session.getId();
		pendingSessions.remove(sessionId);
		authenticatedSessions.remove(sessionId);
		for (Map.Entry<UUID, Set<String>> entry : chatSessions.entrySet()) {
			entry.getValue().remove(sessionId);
		}
	}

	public boolean subscribe(String sessionId, UUID chatPublicId) {
		if (!authenticatedSessions.containsKey(sessionId)) {
			return false;
		}
		chatSessions.computeIfAbsent(chatPublicId, k -> ConcurrentHashMap.newKeySet())
			.add(sessionId);
		return true;
	}

	public boolean unsubscribe(String sessionId, UUID chatPublicId) {
		if (!authenticatedSessions.containsKey(sessionId)) {
			return false;
		}
		chatSessions.computeIfPresent(chatPublicId, (key, existingSet) -> {
			existingSet.remove(sessionId);
			return existingSet.isEmpty() ? null : existingSet;
		});
		return true;
	}

	public List<WebSocketSession> getChatMembers(UUID chatPublicId) {
		Set<String> sessionIds = chatSessions.get(chatPublicId);
		if (sessionIds == null) {
			return List.of();
		}
		Set<String> copy = ConcurrentHashMap.newKeySet();
		copy.addAll(sessionIds);
		return copy.stream()
			.map(authenticatedSessions::get)
			.filter(Objects::nonNull)
			.map(userSession -> userSession.session)
			.toList();
	}

	private static class UserSession {
		WebSocketSession session;
		UUID memberPublicId;

		public UserSession(WebSocketSession session, UUID memberPublicId) {
			this.session = session;
			this.memberPublicId = memberPublicId;
		}
	}
}
