package com.hello.chatting.domain.chat.application;

import java.util.List;

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
	public void createChat(Long memberId, CreateChatRequest request) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

		Member recipient = memberRepository.findByName(request.recipientName())
			.orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

		Chat chat = new Chat(member.getName() + "-" + recipient.getName());
		chatRepository.save(chat);

		ChatMember creatorChatMember = new ChatMember(chat, member);
		ChatMember recipientChatMember = new ChatMember(chat, recipient);
		chatMemberRepository.save(creatorChatMember);
		chatMemberRepository.save(recipientChatMember);
	}

	public List<ChatInfo> getJoinedChat(Long memberId) {
		return chatMemberRepository.findByAllMemberId(memberId).stream()
			.map(chatMember -> {
				Chat chat = chatMember.getChat();
				return new ChatInfo(chat.getId(), chat.getName());
			}).toList();
	}
}
