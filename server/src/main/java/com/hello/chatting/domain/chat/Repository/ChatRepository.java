package com.hello.chatting.domain.chat.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hello.chatting.domain.chat.domain.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {
	boolean existsByUuid(UUID chatPublicId);
}
