package com.hello.chatting.domain.chat.dto;

import java.time.Instant;
import java.util.UUID;

public record ChatLog(
	Long chatId,
	UUID sender,
	String content,
	Instant sentAt
) {
}
