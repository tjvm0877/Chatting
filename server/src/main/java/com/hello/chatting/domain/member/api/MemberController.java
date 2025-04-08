package com.hello.chatting.domain.member.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hello.chatting.domain.member.application.MemberService;
import com.hello.chatting.domain.member.dto.MemberResponse;
import com.hello.chatting.domain.member.dto.SignInRequest;
import com.hello.chatting.domain.member.dto.SignUpRequest;
import com.hello.chatting.global.annotation.CurrentUser;
import com.hello.chatting.global.annotation.LoginRequired;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

	private final MemberService memberService;

	@PostMapping("/sign-up")
	public ResponseEntity<?> signUp(@RequestBody @Valid SignUpRequest request) {
		MemberResponse response = memberService.signUp(request);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/sign-in")
	public ResponseEntity<?> signIn(@RequestBody @Valid SignInRequest request, HttpServletResponse response) {
		return ResponseEntity.ok(memberService.signIn(request));
	}

	@GetMapping
	@LoginRequired
	public ResponseEntity<?> getInfo(@CurrentUser Long memberId) {
		MemberResponse response = memberService.getMemberInfo(memberId);
		return ResponseEntity.ok(response);
	}
}
