package com.hello.chatting.domain.chat.application;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hello.chatting.domain.chat.domain.Chat;
import com.hello.chatting.domain.chat.domain.ChatMember;
import com.hello.chatting.domain.chat.dto.ChatCreateResponse;
import com.hello.chatting.domain.chat.exception.CreateChatFailedException;
import com.hello.chatting.domain.chat.repository.ChatMemberRepository;
import com.hello.chatting.domain.chat.repository.ChatRepository;
import com.hello.chatting.domain.member.domain.Member;
import com.hello.chatting.domain.member.exception.MemberNotFoundException;
import com.hello.chatting.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatManagementService {

	private final ChatRepository chatRepository;
	private final ChatMemberRepository chatMemberRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public ChatCreateResponse create(UUID requestMember, UUID recipientMember) {
		Member requester = memberRepository.findByUuid(requestMember).orElseThrow(MemberNotFoundException::new);
		Member recipient = memberRepository.findByUuid(recipientMember).orElseThrow(MemberNotFoundException::new);
		if (requester.equals(recipient)) {
			throw new CreateChatFailedException();
		}
		Chat chat = new Chat(null);
		chatRepository.save(chat);

		ChatMember requesterChatMember = new ChatMember(requester);
		ChatMember recipientChatMember = new ChatMember(recipient);
		chat.addChatMember(requesterChatMember);
		chat.addChatMember(recipientChatMember);
		chatMemberRepository.saveAll(List.of(requesterChatMember, recipientChatMember));
		
		return new ChatCreateResponse(chat.getUuid());
	}
}
