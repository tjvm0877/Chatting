package com.hello.chatting.domain.chat.repository;

import static com.hello.chatting.domain.chat.domain.QMessage.*;

import java.util.List;
import java.util.UUID;

import com.hello.chatting.domain.chat.dto.query.MessageQueryDto;
import com.hello.chatting.domain.chat.dto.query.QMessageQueryDto;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MessageRepositoryImpl implements MessageRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<MessageQueryDto> search(UUID chatId, Long lastMessageId, int size) {
		return queryFactory.select(new QMessageQueryDto(
				message.id,
				message.sender.member.uuid,
				message.content,
				message.sentAt
			))
			.from(message)
			.where(
				message.chat.uuid.eq(chatId),
				ltMessageId(lastMessageId)
			)
			.orderBy(message.id.asc())
			.limit(size)
			.fetch();
	}

	private BooleanExpression ltMessageId(Long messageId) {
		if (messageId == null) {
			return null;
		}
		return message.id.lt(messageId);
	}
}
