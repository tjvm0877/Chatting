package com.hello.chatting.domain.chat.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hello.chatting.domain.chat.domain.ChatMember;

public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {
}
