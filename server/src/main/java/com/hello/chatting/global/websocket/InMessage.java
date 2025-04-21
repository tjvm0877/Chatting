package com.hello.chatting.global.websocket;

import java.util.UUID;

public record InMessage(
	ClientCommand command,
	UUID destination,
	UUID sender,
	String content
) {
}
