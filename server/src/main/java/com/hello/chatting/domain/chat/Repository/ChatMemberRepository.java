package com.hello.chatting.domain.chat.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hello.chatting.domain.chat.domain.ChatMember;

public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {

	@Query("""
		    SELECT DISTINCT cm FROM ChatMember cm
		    JOIN FETCH cm.chat c
		    LEFT JOIN FETCH c.chatMembers otherCm
		    LEFT JOIN FETCH otherCm.member
		    WHERE cm.member.uuid = :memberPublicId
		""")
	List<ChatMember> findAllWithChatAndMembers(@Param("memberPublicId") UUID memberPublicId);

	@Query("SELECT cm FROM ChatMember cm JOIN FETCH cm.member  WHERE cm.chat.id = :chatId")
	List<ChatMember> findAllByChat(@Param("chatId") Long chatId);

	@Query("SELECT (COUNT(cm) > 0) FROM ChatMember cm WHERE cm.chat.uuid = :chatId AND cm.member.uuid = :memberId")
	boolean existsByChatUuidAndMemberUuid(@Param("chatId") UUID chatId, @Param("memberId") UUID memberId);

	@Query("SELECT cm FROM ChatMember cm JOIN FETCH cm.chat WHERE cm.chat.uuid = :chatId AND cm.member.uuid = :memberId")
	Optional<ChatMember> findByChatUuidAndMemberUuid(@Param("chatId") UUID chatId, @Param("memberId") UUID memberId);
}
