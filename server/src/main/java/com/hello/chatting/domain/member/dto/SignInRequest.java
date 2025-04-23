package com.hello.chatting.domain.member.dto;

public record SignInRequest(
	String email,
	String password
) {
}
