import { Box, Grid } from '@mui/material';
import UserInfo from '../components/UserInfo';
import ChatList from '../components/ChatList';

import ChatHeader from '../components/ChatHeader';
import ChatLog from '../components/ChatLog';
import ChatInput from '../components/ChatInput';

const Chat = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        sx={{
          height: '80vh',
          width: '80vw',
          borderRadius: 2,
          boxShadow: 3,
          overflow: 'hidden',
        }}
      >
        <Grid
          size={4}
          sx={{
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ height: '10%' }}>
            <UserInfo />
          </Box>
          <Box sx={{ height: '90%', overflowY: 'auto' }}>
            <ChatList />
          </Box>
        </Grid>
        <Grid size={8} sx={{ height: '100%' }}>
          <Box sx={{ height: '10%' }}>
            <ChatHeader />
          </Box>
          <Box sx={{ height: '80%' }}>
            <ChatLog />
          </Box>
          <Box sx={{ height: '10%' }}>
            <ChatInput />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
