import { Box, Grid, Modal } from '@mui/material';
import UserInfo from '../components/UserInfo';
import ChatList from '../components/ChatList';

import ChatHeader from '../components/ChatHeader';
import ChatLog from '../components/ChatLog';
import ChatInput from '../components/ChatInput';
import { useState } from 'react';
import CreateChat from '../components/CreateChat';

const Chat = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '60vh',
            width: '50vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <CreateChat isModalOpen={isModalOpen} onClose={handleModalClose} />
        </Box>
      </Modal>
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
            <UserInfo onModalOpen={handleModalOpen} />
          </Box>
          <Box sx={{ height: '90%', overflowY: 'auto' }}>
            <ChatList isModalOpen={isModalOpen} />
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
