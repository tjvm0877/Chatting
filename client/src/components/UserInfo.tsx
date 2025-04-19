import { AddBox } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { User } from '../types/User';
import { getUserInfo } from '../api/members';

interface UserInfoProps {
  onModalOpen: () => void;
}

const UserInfo = ({ onModalOpen }: UserInfoProps) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo();
        const user: User = {
          username: data.name,
          email: data.email,
          avatarUrl: data.name.charAt(0) || '?',
        };
        setUser(user);
      } catch (error) {
        console.error('유저 정보를 불러오지 못했습니다:', error);
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: blue[100],
        px: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar>{user?.avatarUrl}</Avatar>
        <Box>
          <Typography fontWeight="bold">{user?.username}</Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={onModalOpen}>
        <AddBox />
      </IconButton>
    </Box>
  );
};

export default UserInfo;
