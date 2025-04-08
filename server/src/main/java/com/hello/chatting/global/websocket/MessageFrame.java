package com.hello.chatting.global.websocket;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageFrame {
	private CommandType type;
	private String destination;
	private String body;
}
