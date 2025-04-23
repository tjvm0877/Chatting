package com.hello.chatting.domain.member.exception;

import com.hello.chatting.global.error.exception.BusinessException;
import com.hello.chatting.global.error.exception.ErrorCode;

public class SignInFailedException extends BusinessException {

	public SignInFailedException() {
		super(ErrorCode.UNAUTHORIZED);
	}
}
