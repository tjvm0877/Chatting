package com.hello.chatting.domain.member.application;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hello.chatting.domain.member.domain.Member;
import com.hello.chatting.domain.member.dto.MemberResponse;
import com.hello.chatting.domain.member.exception.MemberNotFoundException;
import com.hello.chatting.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

	private final MemberRepository memberRepository;

	public MemberResponse findMember(UUID uuid) {
		Member member = memberRepository.findByUuid(uuid).orElseThrow(MemberNotFoundException::new);
		return MemberResponse.from(member);
	}

	public List<MemberResponse> getMemberList() {
		return memberRepository.findAll().stream()
			.map(MemberResponse::from)
			.toList();
	}
}
