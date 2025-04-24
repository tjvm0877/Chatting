package com.hello.chatting.domain.chat.application;

import java.time.Instant;
import java.util.UUID;

import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hello.chatting.domain.chat.domain.ChatMember;
import com.hello.chatting.domain.chat.domain.Message;
import com.hello.chatting.domain.chat.repository.ChatMemberRepository;
import com.hello.chatting.domain.chat.repository.ChatRepository;
import com.hello.chatting.domain.chat.repository.MessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatService {

	private final ChatMemberRepository chatMemberRepository;
	private final MessageRepository messageRepository;

	public boolean isJoinedMember(UUID chatPublicId, UUID memberPublicId) {
		return chatMemberRepository.existsByChatUuidAndMemberUuid(chatPublicId, memberPublicId);
	}

	@Transactional
	public void saveMessage(UUID chatPublicId, UUID memberPublicId, String content, Instant sentAt) {
		ChatMember chatMember = chatMemberRepository.findByChatUuidAndMemberUuid(chatPublicId, memberPublicId)
			.orElseThrow(IllegalArgumentException::new);
		Message message = new Message(chatMember.getChat(), chatMember, content, sentAt);
		messageRepository.save(message);
	}
}
