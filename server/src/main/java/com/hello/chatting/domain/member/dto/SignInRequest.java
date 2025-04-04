package com.hello.chatting.domain.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignInRequest(
	@Email
	@NotBlank
	String email,

	@NotBlank
	String password
) {
}
