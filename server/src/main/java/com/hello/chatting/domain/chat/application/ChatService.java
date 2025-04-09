package com.hello.chatting.domain.chat.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hello.chatting.domain.chat.Repository.ChatMemberRepository;
import com.hello.chatting.domain.chat.Repository.ChatRepository;
import com.hello.chatting.domain.chat.Repository.MessageRepository;
import com.hello.chatting.domain.chat.domain.Chat;
import com.hello.chatting.domain.chat.domain.ChatMember;
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

	public boolean isChatExist(Long chatId) {
		return chatRepository.existsById(chatId);
	}

	public boolean isChatMember(Long chatId, Long memberId) {
		return chatMemberRepository.isChatMemberExist(chatId, memberId);
	}

	@Transactional
	public void saveMessageLog(Long chatId, Long memberId, String message) {
		Chat chat = chatRepository.findById(chatId)
			.orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

		Message log = new Message(member, chat, message);
		messageRepository.save(log);
	}
}
