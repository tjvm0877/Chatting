import { Cancel } from '@mui/icons-material';
import {
  Box,
  Stack,
  TextField,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUserList } from '../api/members';
import { useMemberStore } from '../stores/userStore';
import { requestCreateChat } from '../api/chat';

interface memberInfo {
  uuid: string;
  avatar: string;
  name: string;
  email: string;
}

interface CreateChatProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const CreateChat = ({ isModalOpen, onClose }: CreateChatProps) => {
  const [members, setMembers] = useState<memberInfo[]>([]);
  const user = useMemberStore((state) => state.member);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const fetchUserInfo = async () => {
      const data = await getUserList();
      const members: memberInfo[] = data
        .filter((item) => item.name !== user?.name)
        .map((item) => ({
          uuid: item.uuid,
          avatar: item.name.charAt(0),
          name: item.name,
          email: item.email,
        }));
      setMembers(members);
    };

    fetchUserInfo();
  }, [isModalOpen, user?.name]);

  const handleCreateChat = async (selectedMember: memberInfo) => {
    try {
      requestCreateChat(selectedMember.uuid);
      onClose();
    } catch (error) {
      console.log(error);
      alert('채팅 생성 실패');
    }
  };

  return (
    <Stack spacing={1} sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" fontWeight={'bold'}>
          Create Chat
        </Typography>
        <IconButton onClick={onClose}>
          <Cancel />
        </IconButton>
      </Box>
      <TextField placeholder="이름, 이메일 검색" />
      <List sx={{ height: '80%', width: '100%', overflowY: 'auto' }}>
        {members.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemButton
                onClick={() => handleCreateChat(item)}
                sx={{
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <ListItemAvatar>
                  <Avatar>{item.avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.email} />
              </ListItemButton>
            </ListItem>
            {index < members.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
};

export default CreateChat;
