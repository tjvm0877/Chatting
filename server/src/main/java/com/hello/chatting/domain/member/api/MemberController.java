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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@Tag(name = "회원", description = "회원 관련 API")
public class MemberController {

	private final MemberService memberService;

	@GetMapping
	@SignInRequired
	@Operation(
		summary = "회원 정보 조회",
		description = " [Authorization 헤더(JWT) 필요] 로그인한 회원의 정보를 조회합니다.",
		security = @SecurityRequirement(name = "Authorization"))
	public ResponseEntity<?> getMember(@Parameter(hidden = true) @CurrentMember UUID memberPublicId) {
		MemberResponse response = memberService.findMember(memberPublicId);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/list")
	@SignInRequired
	@Operation(
		summary = "회원 리스트 조회",
		description = " [Authorization 헤더(JWT) 필요] 회원 리스트를 조회합니다.",
		security = @SecurityRequirement(name = "Authorization"))
	public ResponseEntity<?> getMembers() {
		List<MemberResponse> response = memberService.getMemberList();
		return ResponseEntity.ok(response);
	}
}
