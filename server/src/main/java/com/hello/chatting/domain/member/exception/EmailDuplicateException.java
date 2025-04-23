package com.hello.chatting.domain.member.exception;

import com.hello.chatting.global.error.exception.ErrorCode;
import com.hello.chatting.global.error.exception.InvalidValueException;

public class EmailDuplicateException extends InvalidValueException {

	public EmailDuplicateException(String message) {
		super(message, ErrorCode.EMAIL_DUPLICATE);
	}
}
