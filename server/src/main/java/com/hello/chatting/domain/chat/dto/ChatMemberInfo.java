package com.hello.chatting.domain.chat.dto;

import java.util.UUID;

import com.hello.chatting.domain.member.domain.Member;

public record ChatMemberInfo(
	String name,
	UUID uuid
) {
	public static ChatMemberInfo of(Member member) {
		return new ChatMemberInfo(member.getName(), member.getUuid());
	}
}
