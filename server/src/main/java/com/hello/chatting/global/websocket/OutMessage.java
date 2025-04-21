package com.hello.chatting.global.websocket;

import java.time.Instant;
import java.util.UUID;

public record OutMessage(
	ServerCommand command,
	UUID destination,
	UUID sender,
	String content,
	Instant timeStamp
) {
}
