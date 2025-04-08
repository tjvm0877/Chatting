package com.hello.chatting.domain.member.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hello.chatting.domain.member.domain.Member;
import com.hello.chatting.domain.member.dto.LoginResponse;
import com.hello.chatting.domain.member.dto.MemberResponse;
import com.hello.chatting.domain.member.dto.SignInRequest;
import com.hello.chatting.domain.member.dto.SignUpRequest;
import com.hello.chatting.domain.member.repository.MemberRepository;
import com.hello.chatting.global.error.BusinessException;
import com.hello.chatting.global.error.ErrorCode;
import com.hello.chatting.global.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

	private final MemberRepository memberRepository;
	private final JwtProvider jwtProvider;

	@Transactional
	public MemberResponse signUp(SignUpRequest request) {
		if (memberRepository.existsByEmail(request.email())) {
			throw new BusinessException(ErrorCode.EMAIL_DUPLICATE);
		}
		Member member = new Member(request.email(), request.name(), request.password());
		memberRepository.save(member);
		return MemberResponse.of(member);
	}

	public LoginResponse signIn(SignInRequest request) {
		Member member = memberRepository.findByEmail(request.email()).orElseThrow(
			() -> new BusinessException(ErrorCode.UNAUTHORIZED)
		);
		if (!member.isValidPassword(request.password())) {
			throw new BusinessException(ErrorCode.UNAUTHORIZED);
		}
		return new LoginResponse(jwtProvider.generateAccessToken(member.getId()));
	}

	public List<MemberResponse> findAllMembers() {
		return memberRepository.findAll().stream().map((MemberResponse::of)).toList();
	}

	public MemberResponse getMemberInfo(Long memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
		return MemberResponse.of(member);
	}
}
