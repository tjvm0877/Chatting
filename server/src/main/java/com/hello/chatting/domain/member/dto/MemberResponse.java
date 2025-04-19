package com.hello.chatting.domain.member.dto;

import com.hello.chatting.domain.member.domain.Member;

public record MemberResponse(
	String email,
	String name
) {

	public static MemberResponse of(Member member) {
		return new MemberResponse(member.getEmail(), member.getName());
	}
}
