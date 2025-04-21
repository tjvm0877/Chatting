package com.hello.chatting.domain.member.dto;

import java.util.UUID;

import com.hello.chatting.domain.member.domain.Member;

public record MemberResponse(
	UUID uuid,
	String email,
	String name
) {

	public static MemberResponse of(Member member) {
		return new MemberResponse(member.getUuid(), member.getEmail(), member.getName());
	}
}
