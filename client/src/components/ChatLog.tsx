import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import ChatMessage from './ChatMessage';
import { useEffect } from 'react';
import webSocketClient from '../api/websocket';
import useChatStore from '../stores/chatStore';
import { useUserStore } from '../stores/userStore';

const ChatLog = () => {
  const chatId = useChatStore((state) => state.chatId);
  const user = useUserStore((state) => state.user);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const clearChatMessages = useChatStore((state) => state.clearChatMessages);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const unsubscribe = webSocketClient.subscribe(chatId, (msg) => {
      // if (msg.sender === user?.username) return;
      setMessages(msg);
    });

    return () => {
      unsubscribe();
      clearChatMessages();
    };
  }, [chatId, setMessages, clearChatMessages, user?.username]);

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
          type={msg.sender === user?.username ? 'SENT' : 'RECEIVED'}
          content={msg.content}
          timestamp={'10:10'}
        />
      ))}
    </Box>
  );
};

export default ChatLog;
