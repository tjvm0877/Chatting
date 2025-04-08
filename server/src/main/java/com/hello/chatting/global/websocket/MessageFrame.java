package com.hello.chatting.global.websocket;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageFrame {
	private CommandType type;
	private Long destination;
	private String body;
}
