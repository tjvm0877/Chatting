package com.hello.chatting.domain.chat.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hello.chatting.domain.chat.application.ChatService;
import com.hello.chatting.domain.chat.dto.CreateChatRequest;
import com.hello.chatting.global.annotation.CurrentUser;
import com.hello.chatting.global.annotation.LoginRequired;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

	private final ChatService chatService;

	// 방 생성
	@PostMapping
	@LoginRequired
	public ResponseEntity<?> createChat(
		@CurrentUser Long memberId,
		@RequestBody @Valid CreateChatRequest request) {

		chatService.createChat(memberId, request);
		return ResponseEntity.ok().build();
	}

	// 회원이 참가한 방 조회

	// 방 삭제
}
