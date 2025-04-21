package com.hello.chatting.domain.chat.api;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hello.chatting.domain.chat.application.ChatManageService;
import com.hello.chatting.domain.chat.dto.ChatInfo;
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

	@PostMapping
	@LoginRequired
	public ResponseEntity<?> createChat(
		@CurrentUser UUID memberPublicId,
		@RequestBody CreateChatRequest request) {

		chatManageService.createChat(memberPublicId, request);
		return ResponseEntity.ok().build();
	}

	@GetMapping
	@LoginRequired
	public ResponseEntity<?> getChatList(@CurrentUser UUID memberPublicId) {
		List<ChatInfo> response = chatManageService.getJoinedChat(memberPublicId);
		return ResponseEntity.ok(response);
	}

}
