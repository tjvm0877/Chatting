package com.hello.chatting.domain.chat.exception;

import com.hello.chatting.global.error.exception.BusinessException;
import com.hello.chatting.global.error.exception.ErrorCode;

public class CreateChatFailedException extends BusinessException {

	public CreateChatFailedException() {
		super(ErrorCode.CREATE_CHAT_FAILED);
	}
}
