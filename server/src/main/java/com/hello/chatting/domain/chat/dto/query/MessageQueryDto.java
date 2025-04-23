package com.hello.chatting.domain.chat.dto.query;

import java.time.Instant;
import java.util.UUID;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;

@Getter
public class MessageQueryDto {
	private Long id;
	private UUID sender;
	private String content;
	private Instant sentAt;

	public MessageQueryDto() {
	}

	@QueryProjection
	public MessageQueryDto(Long id, UUID sender, String content, Instant sentAt) {
		this.id = id;
		this.sender = sender;
		this.content = content;
		this.sentAt = sentAt;
	}
}
