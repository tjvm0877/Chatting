package com.hello.chatting.global.resolver;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.hello.chatting.global.annotation.CurrentMember;
import com.hello.chatting.global.error.exception.BusinessException;
import com.hello.chatting.global.error.exception.ErrorCode;
import com.hello.chatting.global.jwt.JwtProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SignInArgumentResolver implements HandlerMethodArgumentResolver {

	private final JwtProvider jwtProvider;
	private static final String AUTHORIZATION_HEADER = "Authorization";

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.hasParameterAnnotation(CurrentMember.class);
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
		NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

		HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
		String token = request.getHeader(AUTHORIZATION_HEADER);

		if (token == null) {
			throw new BusinessException(ErrorCode.UNAUTHORIZED);
		}

		return jwtProvider.getMemberUuidFromToken(token);
	}
}
