package com.hello.chatting.global.websocket;

public record MessageDto(
	Long topic,
	String sender,
	String content
) {
}
