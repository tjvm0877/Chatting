import { Send } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import useChatStore from '../stores/chatStore';
import { useState, useEffect } from 'react';
import webSocketClient from '../api/websocket';
import { CLIENT_COMMAND } from '../types/Message';
import { useMemberStore } from '../stores/userStore';

const ChatInput = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const chatId = useChatStore((state) => state.chatId);
  const member = useMemberStore((state) => state.member);

  useEffect(() => {
    console.log('ChatInput - chatId 변경됨:', chatId);
  }, [chatId]);

  const onMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) {
      return; // 빈 메시지는 보내지 않음
    }

    if (!chatId || !member) {
      console.error('메시지 전송 실패: chatId 또는 member가 없습니다', {
        chatId,
        member,
      });
      return;
    }

    webSocketClient.sendMessage(
      CLIENT_COMMAND.SEND,
      messageInput,
      member.uuid,
      chatId
    );

    // 메시지 전송 후 입력창 비우기
    setMessageInput('');
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
        onKeyPress={handleKeyPress}
        placeholder={chatId ? 'Send a message' : '먼저 채팅방을 선택하세요'}
        disabled={!chatId}
      />
      <Button
        variant={'contained'}
        onClick={handleSendMessage}
        startIcon={<Send />}
        disabled={!chatId || !messageInput.trim()}
      >
        send
      </Button>
    </Box>
  );
};

export default ChatInput;
