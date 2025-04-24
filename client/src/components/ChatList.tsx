import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useChatStore from '../stores/chatStore';
import { ChatInfo, getChatList } from '../api/chat';
import { useMemberStore } from '../stores/userStore';

interface ChatListProps {
  isModalOpen: boolean;
}

const ChatList = ({ isModalOpen }: ChatListProps) => {
  const chatId = useChatStore((state) => state.chatId);
  const member = useMemberStore((state) => state.member);
  const setChatId = useChatStore((state) => state.setChatId);
  const setChatName = useChatStore((state) => state.setName);
  const [chatList, setChatList] = useState<ChatInfo[]>([]);

  const requestChatList = async () => {
    if (isModalOpen) {
      return;
    }

    try {
      const data = await getChatList();
      setChatList(data);
    } catch (error) {
      console.error('채팅 리스트를 불러오지 못했습니다:', error);
    }
  };

  useEffect(() => {
    requestChatList();
  }, [chatId, member, isModalOpen]);

  const handleSelectChat = (selectedChat: ChatInfo) => {
    console.log(selectedChat);
    setChatId(selectedChat.uuid);
    setChatName(selectedChat.name);
  };

  return (
    <List
      sx={{ height: '100%', overflowY: 'auto' }}
      role="list"
      aria-label="chat list"
    >
      {chatList.map((chat, index) => (
        <React.Fragment key={chat.uuid}>
          <ListItem alignItems="flex-start">
            <ListItemButton
              onClick={() => handleSelectChat(chat)}
              sx={{
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <ListItemAvatar>
                <Avatar>{chat.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={chat.name}
                slotProps={{
                  secondary: {
                    sx: {
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          {index < chatList.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
      {/* <Button
        fullWidth
        variant="text"
        startIcon={<RestartAlt />}
        onClick={requestChatList}
      >
        Reload
      </Button> */}
    </List>
  );
};

export default ChatList;
