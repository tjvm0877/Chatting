import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import ChatMessage from './ChatMessage';
import { useEffect } from 'react';
import webSocketClient from '../api/websocket';
import useChatStore from '../stores/chatStore';
import { useMemberStore } from '../stores/userStore';

const ChatLog = () => {
  const chatId = useChatStore((state) => state.chatId);
  const member = useMemberStore((state) => state.member);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const clearChatMessages = useChatStore((state) => state.clearChatMessages);

  useEffect(() => {
    if (!chatId || !member) {
      return;
    }
    const unsubscribe = webSocketClient.subscribe(
      chatId,
      member.uuid,
      (msg) => {
        setMessages(msg);
      }
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
          timestamp={'10:10'}
        />
      ))}
    </Box>
  );
};

export default ChatLog;
