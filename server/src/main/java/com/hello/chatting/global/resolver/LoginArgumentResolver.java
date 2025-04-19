package com.hello.chatting.global.resolver;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.hello.chatting.global.annotation.CurrentUser;
import com.hello.chatting.global.error.BusinessException;
import com.hello.chatting.global.error.ErrorCode;
import com.hello.chatting.global.jwt.JwtProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class LoginArgumentResolver implements HandlerMethodArgumentResolver {

	private final JwtProvider jwtProvider;
	private static final String AUTHORIZATION_HEADER = "Authorization";

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.hasParameterAnnotation(CurrentUser.class);
	}

	@Override
	public Long resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
		NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

		HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
		String token = request.getHeader(AUTHORIZATION_HEADER);

		if (token == null) {
			throw new BusinessException(ErrorCode.UNAUTHORIZED);
		}

		return jwtProvider.getMemberIdFromToken(token);
	}
}
