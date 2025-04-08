package com.hello.chatting.domain.chat.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hello.chatting.domain.chat.application.ChatManageService;
import com.hello.chatting.domain.chat.dto.CreateChatRequest;
import com.hello.chatting.global.annotation.CurrentUser;
import com.hello.chatting.global.annotation.LoginRequired;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

	private final ChatManageService chatManageService;

	// 방 생성
	@PostMapping
	@LoginRequired
	public ResponseEntity<?> createChat(
		@CurrentUser Long memberId,
		@RequestBody @Valid CreateChatRequest request) {

		chatManageService.createChat(memberId, request);
		return ResponseEntity.ok().build();
	}

	// 회원이 참가한 방 조회

	// 방 삭제

	// 채팅 기록 불러오기 -> 페이징 붙이면 될 것 같은데?
}
