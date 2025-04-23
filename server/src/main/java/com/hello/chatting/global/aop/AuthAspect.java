package com.hello.chatting.global.aop;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.hello.chatting.global.error.exception.BusinessException;
import com.hello.chatting.global.error.exception.ErrorCode;
import com.hello.chatting.global.jwt.JwtProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class AuthAspect {

	private final JwtProvider jwtProvider;

	@Before("@annotation(com.hello.chatting.global.annotation.LoginRequired)")
	public void validateSignIn() {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		String token = request.getHeader("Authorization");
		if (!jwtProvider.isValidToken(token)) {
			throw new BusinessException(ErrorCode.HANDLE_ACCESS_DENIED);
		}
	}
}
