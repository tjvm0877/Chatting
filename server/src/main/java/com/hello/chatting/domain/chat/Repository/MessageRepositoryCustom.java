package com.hello.chatting.domain.chat.repository;

import java.util.List;
import java.util.UUID;

import com.hello.chatting.domain.chat.dto.query.MessageQueryDto;

public interface MessageRepositoryCustom {

	List<MessageQueryDto> search(UUID chatId, Long lastMessageId, int size);
}
