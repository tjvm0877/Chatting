package com.hello.chatting.global.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.hello.chatting.domain.member.application.AuthService;
import com.hello.chatting.domain.member.dto.SignUpRequest;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

	private final AuthService authService;

	@Override
	public void run(String... args) throws Exception {
		SignUpRequest user1 = new SignUpRequest("test@gmail.com", "user", "123qwe");
		SignUpRequest user2 = new SignUpRequest("test2@gmail.com", "user2", "123qwe");
		authService.register(user1);
		authService.register(user2);
	}
}
