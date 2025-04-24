package com.hello.chatting.domain.chat.api;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
@Tag(name = "채팅", description = "채팅 관련 API")
public class ChatController {

	private final ChatManagementService chatManagementService;
	private final ChatSearchService chatSearchService;

	@PostMapping
	@SignInRequired
	@Operation(
		summary = "채팅방 생성",
		description = " [Authorization 헤더(JWT) 필요] 새로운 채팅방을 생성합니다.",
		security = @SecurityRequirement(name = "Authorization"))
	public ResponseEntity<?> createNewChat(@Parameter(hidden = true) @CurrentMember UUID memberPublicId,
		@RequestParam("recipient") UUID recipient) {
		ChatCreateResponse response = chatManagementService.create(memberPublicId, recipient);
		return ResponseEntity.ok(response);
	}

	@GetMapping
	@SignInRequired
	@Operation(
		summary = "사용자가 참여한 채팅방 조회",
		description = " [Authorization 헤더(JWT) 필요] 사용자가 참여한 모든 채팅방을 조회합니다.",
		security = @SecurityRequirement(name = "Authorization"))
	public ResponseEntity<?> getChatList(@Parameter(hidden = true) @CurrentMember UUID memberPublicId) {
		List<ChatResponse> response = chatSearchService.getJoinedChat(memberPublicId);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/logs")
	@SignInRequired
	@Operation(
		summary = "채팅 기록 조회",
		description = " [Authorization 헤더(JWT) 필요] 채팅 기록을 조회합니다. `lastChatId`를 통해 페이징을 할 수 있습니다.",
		security = @SecurityRequirement(name = "Authorization"))
	public ResponseEntity<?> getChatLogs(
		@RequestParam(value = "chat") UUID chatPublicId,
		@RequestParam(value = "lastChatId", required = false) Long lastChatId,
		@RequestParam(value = "size", required = false, defaultValue = "10") int size
	) {
		List<ChatLog> response = chatSearchService.getChatLogs(chatPublicId, lastChatId, size);
		return ResponseEntity.ok(response);
	}
}
