package com.hello.chatting.domain.chat.application;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hello.chatting.domain.chat.Repository.ChatMemberRepository;
import com.hello.chatting.domain.chat.Repository.ChatRepository;
import com.hello.chatting.domain.chat.domain.Chat;
import com.hello.chatting.domain.chat.domain.ChatMember;
import com.hello.chatting.domain.chat.dto.ChatInfo;
import com.hello.chatting.domain.chat.dto.CreateChatRequest;
import com.hello.chatting.domain.member.domain.Member;
import com.hello.chatting.domain.member.repository.MemberRepository;
import com.hello.chatting.global.error.BusinessException;
import com.hello.chatting.global.error.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatManageService {

	private final ChatRepository chatRepository;
	private final ChatMemberRepository chatMemberRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public void createChat(UUID memberPublicId, CreateChatRequest request) {
		Member member = memberRepository.findByUuid(memberPublicId)
			.orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

		Member recipient = memberRepository.findByUuid(request.recipient())
			.orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

		// 자기 자신에게 채팅 금지
		if (member.equals(recipient)) {
			throw new BusinessException(ErrorCode.INVALID_CHAT_REQUEST);
		}

		Chat chat = new Chat(null);
		chatRepository.save(chat);

		ChatMember creatorChatMember = new ChatMember(chat, member);
		ChatMember recipientChatMember = new ChatMember(chat, recipient);

		chatMemberRepository.saveAll(List.of(creatorChatMember, recipientChatMember));
	}

	public List<ChatInfo> getJoinedChat(UUID memberPublicId) {
		return chatMemberRepository.findAllByMemberUuid(memberPublicId).stream()
			.map(chatMember -> {
				Chat chat = chatMember.getChat();
				return new ChatInfo(chat.getId(), chat.getName());
			}).toList();
	}
}
