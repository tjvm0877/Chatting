package com.hello.chatting.domain.chat.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hello.chatting.domain.chat.domain.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {

	boolean existsByUuid(@Param("memberPublicId") UUID memberPublicId);
}
