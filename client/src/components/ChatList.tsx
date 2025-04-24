import {
  Avatar,
  Button,
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
import { RestartAlt } from '@mui/icons-material';

const ChatList = () => {
  const setChatId = useChatStore((state) => state.setChatId);
  const setChatName = useChatStore((state) => state.setName);
  const [chatList, setChatList] = useState<ChatInfo[]>([]);

  const requestChatList = async () => {
    try {
      const data = await getChatList();
      setChatList(data);
    } catch (error) {
      console.error('채팅 리스트를 불러오지 못했습니다:', error);
    }
  };

  useEffect(() => {
    requestChatList();
  }, []);

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
                secondary={'최근 메시지...'}
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
      <Button
        fullWidth
        variant="contained"
        startIcon={<RestartAlt />}
        onClick={requestChatList}
      >
        Reload
      </Button>
    </List>
  );
};

export default ChatList;
