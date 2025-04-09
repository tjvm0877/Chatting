package com.hello.chatting.global.websocket;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;

@Getter
public class SessionInfo {
	WebSocketSession session;
	Long memberId;
	String memberName;
	List<Long> subscribeTopics;

	SessionInfo(WebSocketSession session, Long memberId, String memberName) {
		this.session = session;
		this.memberId = memberId;
		this.memberName = memberName;
		this.subscribeTopics = new ArrayList<>();
	}

	void addTopic(Long topic) {
		subscribeTopics.add(topic);
	}

	void removeTopic(Long topic) {
		subscribeTopics.remove(topic);
	}
}
