package com.hello.chatting.domain.chat.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hello.chatting.domain.chat.domain.ChatMember;

public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {

	@Query("SELECT COUNT(cm) > 0 FROM ChatMember cm WHERE cm.chat.uuid = :chatId AND cm.member.uuid = :memberPublicId")
	boolean isChatMemberExist(@Param("chatId") UUID chatId, @Param("memberPublicId") UUID memberPublicId);

	@Query("SELECT cm FROM ChatMember cm JOIN FETCH cm.chat WHERE cm.member.uuid = :uuid")
	List<ChatMember> findAllByMemberUuid(@Param("uuid") UUID uuid);

	@Query("SELECT cm FROM ChatMember cm JOIN FETCH cm.member WHERE cm.chat.id = :chatId")
	List<ChatMember> findAllChatMember(@Param("chatId") Long chatId);

	List<ChatMember> findAllByChatIdIn(List<Long> chatIds);
}
