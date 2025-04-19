import { Send } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import useCurrentChatStore from '../stores/chatStore';
import { useState } from 'react';
import webSocketClient from '../api/websocket';
import { CommandType } from '../types/Message';

const ChatInput = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const chatId = useCurrentChatStore((state) => state.chatId);

  const onMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (!chatId) {
      return;
    }
    webSocketClient.sendMessage(CommandType.PUBLISH, messageInput, chatId);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: 1,
        boxSizing: 'border-box',
      }}
    >
      <TextField
        fullWidth
        value={messageInput}
        onChange={onMessageInputChange}
        placeholder="Send a message"
      />
      <Button
        variant={'contained'}
        onClick={handleSendMessage}
        startIcon={<Send />}
      >
        send
      </Button>
    </Box>
  );
};

export default ChatInput;
