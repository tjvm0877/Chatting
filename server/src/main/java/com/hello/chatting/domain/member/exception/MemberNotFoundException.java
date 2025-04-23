package com.hello.chatting.domain.member.exception;

import com.hello.chatting.global.error.exception.EntityNotFoundException;

public class MemberNotFoundException extends EntityNotFoundException {

	public MemberNotFoundException() {
		super("존재하지 않는 회원입니다.");
	}
}