package com.hello.chatting.domain.chat.dto;

import java.util.UUID;

public record CreateChatRequest(
	UUID recipient
) {
}
