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
import { getChatList } from '../api/chat';
import useChatStore from '../stores/chatStore';

interface chatInfo {
  chatId: number;
  chatName: string;
}

interface ChatListProps {
  isModalOpen: boolean;
}

const ChatList = ({ isModalOpen }: ChatListProps) => {
  const setChat = useChatStore((state) => state.setChatId);
  const setChatName = useChatStore((state) => state.setName);
  const [chatList, setChatList] = useState<chatInfo[]>([]);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const data = await getChatList();
        const chats: chatInfo[] = data.map((item: any) => ({
          chatId: item.id,
          chatName: item.name,
          avatar: item.name?.charAt(0) || '?',
          lastMessage: item.lastMessage || '', // lastMessage가 있으면
        }));
        setChatList(chats);
      } catch (error) {
        console.error('채팅 리스트를 불러오지 못했습니다:', error);
      }
    };
    fetchChatList();
  }, [isModalOpen]);

  const handleSelectChat = (selectedChat: chatInfo) => {
    setChat(selectedChat.chatId);
    setChatName(selectedChat.chatName);
  };

  return (
    <List
      sx={{ height: '100%', overflowY: 'auto' }}
      role="list"
      aria-label="chat list"
    >
      {chatList.map((item, index) => (
        <React.Fragment key={item.chatId}>
          <ListItem alignItems="flex-start">
            <ListItemButton
              onClick={() => handleSelectChat(item)}
              sx={{
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <ListItemAvatar>
                <Avatar>{item.chatName.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.chatName}
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
    </List>
  );
};

export default ChatList;
