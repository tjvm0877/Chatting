import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect } from 'react';
import { useMemberStore } from '../stores/userStore';
import { Member } from '../types/Member';
import { getUserInfo } from '../api/members';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import webSocketClient from '../api/websocket';
import useAuthStore from '../stores/authStore';

const UserInfo = () => {
  const user = useMemberStore((state) => state.member);
  const setUser = useMemberStore((state) => state.setMember);
  const setIsSignIn = useAuthStore((state) => state.setIsSignIn);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo();
        const user: Member = {
          uuid: data.uuid,
          name: data.name,
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

  const handleLogout = () => {
    webSocketClient.disconnect();
    localStorage.clear();
    setIsSignIn(false);
    navigate('/sign-in');
  };

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
          <Typography fontWeight="bold">{user?.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={handleLogout}>
        <Logout />
      </IconButton>
    </Box>
  );
};

export default UserInfo;
