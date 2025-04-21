package com.hello.chatting.domain.chat.application;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hello.chatting.domain.chat.Repository.ChatMemberRepository;
import com.hello.chatting.domain.chat.Repository.ChatRepository;
import com.hello.chatting.domain.chat.Repository.MessageRepository;
import com.hello.chatting.domain.chat.domain.Chat;
import com.hello.chatting.domain.chat.domain.Message;
import com.hello.chatting.domain.member.domain.Member;
import com.hello.chatting.domain.member.repository.MemberRepository;
import com.hello.chatting.global.error.BusinessException;
import com.hello.chatting.global.error.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatService {

	private final MemberRepository memberRepository;
	private final ChatRepository chatRepository;
	private final ChatMemberRepository chatMemberRepository;
	private final MessageRepository messageRepository;

	public boolean isChatExist(UUID chatPublicId) {
		return chatRepository.existsByUuid(chatPublicId);
	}

	public boolean isChatMember(UUID chatPublicID, UUID memberPublicId) {
		return chatMemberRepository.isChatMemberExist(chatPublicID, memberPublicId);
	}

	@Transactional
	public void saveMessage(Long chatId, Long memberId, String message) {
		Chat chat = chatRepository.findById(chatId)
			.orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

		Message log = new Message(member, chat, message);
		messageRepository.save(log);
	}
}
