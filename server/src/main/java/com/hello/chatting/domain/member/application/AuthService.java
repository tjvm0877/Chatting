package com.hello.chatting.domain.member.application;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hello.chatting.domain.member.domain.Member;
import com.hello.chatting.domain.member.dto.SignInRequest;
import com.hello.chatting.domain.member.dto.SignInResponse;
import com.hello.chatting.domain.member.dto.SignUpRequest;
import com.hello.chatting.domain.member.exception.EmailDuplicateException;
import com.hello.chatting.domain.member.exception.MemberNotFoundException;
import com.hello.chatting.domain.member.exception.SignInFailedException;
import com.hello.chatting.domain.member.repository.MemberRepository;
import com.hello.chatting.global.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtProvider jwtProvider;

	@Transactional
	public void register(SignUpRequest request) {
		if (memberRepository.existsByEmail(request.email())) {
			throw new EmailDuplicateException(request.email());
		}
		String encodedPassword = passwordEncoder.encode(request.password());
		Member member = new Member(request.email(), request.name(), encodedPassword);
		memberRepository.save(member);
	}

	public SignInResponse signIn(SignInRequest request) {
		Member member = memberRepository.findByEmail(request.email()).orElseThrow(MemberNotFoundException::new);
		if (passwordEncoder.matches(request.password(), member.getPassword())) {
			throw new SignInFailedException();
		}
		String accessToken = jwtProvider.generateAccessToken(member.getUuid().toString());
		return new SignInResponse(accessToken);
	}
}
