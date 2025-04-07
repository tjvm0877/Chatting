package com.hello.chatting.domain.chat.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hello.chatting.domain.chat.domain.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
