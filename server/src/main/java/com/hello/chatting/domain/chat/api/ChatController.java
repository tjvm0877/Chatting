package com.hello.chatting.domain.chat.api;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hello.chatting.domain.chat.application.ChatManagementService;
import com.hello.chatting.domain.chat.application.ChatSearchService;
import com.hello.chatting.domain.chat.dto.ChatCreateResponse;
import com.hello.chatting.domain.chat.dto.ChatLog;
import com.hello.chatting.domain.chat.dto.ChatResponse;
import com.hello.chatting.global.annotation.CurrentMember;
import com.hello.chatting.global.annotation.SignInRequired;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {

	private final ChatManagementService chatManagementService;
	private final ChatSearchService chatSearchService;

	@GetMapping("/new")
	@SignInRequired
	public ResponseEntity<?> createNewChat(@CurrentMember UUID memberPublicId,
		@RequestParam("recipient") UUID recipient) {
		ChatCreateResponse response = chatManagementService.create(memberPublicId, recipient);
		return ResponseEntity.ok(response);
	}

	@GetMapping
	@SignInRequired
	public ResponseEntity<?> getChatList(@CurrentMember UUID memberPublicId) {
		List<ChatResponse> response = chatSearchService.getJoinedChat(memberPublicId);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/logs")
	@SignInRequired
	public ResponseEntity<?> getChatLogs(
		@RequestParam(value = "chat") UUID chatPublicId,
		@RequestParam(value = "lastChatId", required = false) Long lastChatId,
		@RequestParam(value = "size", required = false, defaultValue = "10") int size
	) {
		List<ChatLog> response = chatSearchService.getChatLogs(chatPublicId, lastChatId, size);
		return ResponseEntity.ok(response);
	}
}
