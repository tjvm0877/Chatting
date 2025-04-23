package com.hello.chatting.domain.member.dto;

public record SignUpRequest(
	String email,
	String name,
	String password
) {
}
