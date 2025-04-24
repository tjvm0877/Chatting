import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import ChatMessage from './ChatMessage';
import { useEffect } from 'react';
import webSocketClient from '../api/websocket';
import useChatStore from '../stores/chatStore';
import { useMemberStore } from '../stores/userStore';
import { getChatLogs } from '../api/chat';
import { SERVER_COMMAND } from '../types/Message';

const ChatLog = () => {
  const chatId = useChatStore((state) => state.chatId);
  const member = useMemberStore((state) => state.member);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.addMessage);
  const clearChatMessages = useChatStore((state) => state.clearChatMessages);

  const fetchChatLog = async (lastChatId?: number) => {
    if (!chatId) {
      return;
    }

    try {
      const data = await getChatLogs(chatId, lastChatId);
      data.map((message) => {
        setMessages({
          command: SERVER_COMMAND.MESSAGE,
          destination: chatId,
          sender: message.sender,
          content: message.content,
          timestamp: message.sentAt,
        });
      });
    } catch {
      console.log('채팅 기록 조회 실패');
    }
  };

  useEffect(() => {
    if (!chatId || !member) return;
    fetchChatLog();
    const unsubscribe = webSocketClient.subscribe(chatId, member.uuid, (msg) =>
      setMessages(msg)
    );
    return () => {
      unsubscribe();
      clearChatMessages();
    };
  }, [chatId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: grey[100],
        overflowY: 'auto',
      }}
    >
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          type={msg.sender === member?.uuid ? 'SENT' : 'RECEIVED'}
          content={msg.content}
          timestamp={msg.timestamp}
        />
      ))}
    </Box>
  );
};

export default ChatLog;
