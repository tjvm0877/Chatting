package com.hello.chatting.domain.member.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hello.chatting.domain.member.application.AuthService;
import com.hello.chatting.domain.member.dto.SignInRequest;
import com.hello.chatting.domain.member.dto.SignInResponse;
import com.hello.chatting.domain.member.dto.SignUpRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/sign-up")
	public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
		authService.register(request);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/sign-in")
	public ResponseEntity<?> signIn(@RequestBody SignInRequest request) {
		SignInResponse response = authService.signIn(request);
		return ResponseEntity.ok(response);
	}
}
