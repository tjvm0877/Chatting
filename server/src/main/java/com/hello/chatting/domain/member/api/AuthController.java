package com.hello.chatting.domain.member.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hello.chatting.domain.member.application.AuthService;
import com.hello.chatting.domain.member.dto.SignInRequest;
import com.hello.chatting.domain.member.dto.SignInResponse;
import com.hello.chatting.domain.member.dto.SignUpRequest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "인증", description = "인증 관련 API")
public class AuthController {

	private final AuthService authService;

	@PostMapping("/sign-up")
	@Operation(summary = "회원가입")
	public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
		authService.register(request);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/sign-in")
	@Operation(summary = "로그인")
	public ResponseEntity<?> signIn(@RequestBody SignInRequest request) {
		SignInResponse response = authService.signIn(request);
		return ResponseEntity.ok(response);
	}
}
