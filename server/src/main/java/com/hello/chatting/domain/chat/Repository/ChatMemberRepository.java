package com.hello.chatting.domain.chat.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hello.chatting.domain.chat.domain.ChatMember;

public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {

	@Query("SELECT COUNT(cm) > 0 FROM ChatMember cm WHERE cm.chat.id = :chatId AND cm.member.id = :memberId")
	boolean isChatMemberExist(@Param("chatId") Long chatId, @Param("memberId") Long memberId);
}
