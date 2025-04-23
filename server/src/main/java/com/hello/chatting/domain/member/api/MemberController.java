package com.hello.chatting.domain.member.api;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hello.chatting.domain.member.application.MemberService;
import com.hello.chatting.domain.member.dto.MemberResponse;
import com.hello.chatting.global.annotation.CurrentMember;
import com.hello.chatting.global.annotation.SignInRequired;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

	private final MemberService memberService;

	@GetMapping
	@SignInRequired
	public ResponseEntity<?> getMember(@CurrentMember UUID memberPublicId) {
		MemberResponse response = memberService.findMember(memberPublicId);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/list")
	@SignInRequired
	public ResponseEntity<?> getMembers() {
		List<MemberResponse> response = memberService.getMemberList();
		return ResponseEntity.ok(response);
	}
}
