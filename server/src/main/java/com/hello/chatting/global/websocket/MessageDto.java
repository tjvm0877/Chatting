package com.hello.chatting.global.websocket;

public record MessageDto(
	MessageType type,
	Long topic,
	String sender,
	String content
) {
}
