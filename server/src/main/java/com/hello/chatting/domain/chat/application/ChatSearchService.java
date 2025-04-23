package com.hello.chatting.domain.chat.application;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hello.chatting.domain.chat.domain.ChatMember;
import com.hello.chatting.domain.chat.dto.ChatLog;
import com.hello.chatting.domain.chat.dto.ChatResponse;
import com.hello.chatting.domain.chat.repository.ChatMemberRepository;
import com.hello.chatting.domain.chat.repository.MessageRepository;
import com.hello.chatting.domain.member.domain.Member;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatSearchService {
	private final ChatMemberRepository chatMemberRepository;
	private final MessageRepository messageRepository;

	public List<ChatResponse> getJoinedChat(UUID memberPublicId) {
		List<ChatMember> chatMembers = chatMemberRepository.findAllWithChatAndMembersByMemberUuid(memberPublicId);
		return chatMembers.stream()
			.map(ChatMember::getChat)
			.map(chat -> {
				String chatName = chat.getName();
				if (chatName == null || chatName.isEmpty()) {
					List<String> otherNames = chat.getChatMembers().stream()
						.map(ChatMember::getMember)
						.filter(member -> member != null && !memberPublicId.equals(member.getUuid()))
						.map(Member::getName)
						.filter(name -> name != null && !name.isEmpty())
						.toList();
					chatName = String.join(", ", otherNames);
				}
				return new ChatResponse(chat.getUuid(), chatName);
			})
			.toList();
	}

	public List<ChatLog> getChatLogs(UUID chatPublicId, Long lastChatId, int size) {
		return messageRepository.search(chatPublicId, lastChatId, size).stream()
			.map(queryDto -> new ChatLog(queryDto.getId(), queryDto.getSender(), queryDto.getContent(),
				queryDto.getSentAt()))
			.toList();
	}
}
