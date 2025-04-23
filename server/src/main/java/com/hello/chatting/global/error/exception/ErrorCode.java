package com.hello.chatting.global.error.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {
	// Common
	INVALID_INPUT_VALUE(400, "Invalid Input Value"),
	METHOD_NOT_ALLOWED(405, "Invalid Input Value"),
	ENTITY_NOT_FOUND(400, "Entity Not Found"),
	INTERNAL_SERVER_ERROR(500, "Server Error"),
	INVALID_TYPE_VALUE(400, "Invalid Type Value"),
	UNAUTHORIZED(401, "Unauthorized"),
	HANDLE_ACCESS_DENIED(403, "Access is Denied"),

	// Member
	EMAIL_DUPLICATE(400, "Email Duplication"),

	// Chat
	CREATE_CHAT_FAILED(400, "create chat failed");
	private final int status;
	private final String message;

	ErrorCode(int status, String message) {
		this.status = status;
		this.message = message;
	}
}
