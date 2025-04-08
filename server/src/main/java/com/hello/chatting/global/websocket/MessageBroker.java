package com.hello.chatting.global.websocket;

import org.springframework.web.socket.WebSocketSession;

public interface MessageBroker {

	boolean auth(String sessionId, String token);

	void subscribe(String sessionId, String topic);

	void unsubscribe(String sessionId, String topic);

	void publish(String sessionId, String topic, String message);

	void addSession(WebSocketSession session);

	void removeSession(String sessionId);
}
