package com.hello.chatting.domain.chat.dto;

import java.util.List;
import java.util.UUID;

public record ChatInfo(
	UUID uuid,
	String name,
	List<ChatMemberInfo> chatMembers
) {
}
