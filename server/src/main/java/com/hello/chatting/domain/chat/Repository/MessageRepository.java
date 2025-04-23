package com.hello.chatting.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hello.chatting.domain.chat.domain.Message;

public interface MessageRepository extends JpaRepository<Message, Long>, MessageRepositoryCustom {
}
