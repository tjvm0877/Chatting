import { Box, Button, Grid, Modal } from '@mui/material';
import MemberInfo from '../components/UserInfo';
import ChatList from '../components/ChatList';
import ChatHeader from '../components/ChatHeader';
import ChatLog from '../components/ChatLog';
import ChatInput from '../components/ChatInput';
import { useState } from 'react';
import CreateChat from '../components/CreateChat';
import { AddBox } from '@mui/icons-material';

// 스타일 객체 분리
const styles = {
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
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
  },
  gridContainer: {
    height: '80vh',
    width: '80vw',
    borderRadius: 2,
    boxShadow: 3,
    overflow: 'hidden',
  },
  leftGrid: {
    height: '100%',
    flexDirection: 'column',
  },
  userInfoBox: {
    height: '10%',
  },
  createChatBottun: {
    height: '5%',
  },
  chatListBox: {
    height: '85%',
    overflowY: 'auto',
  },
  rightGrid: {
    height: '100%',
  },
  headerBox: {
    height: '10%',
  },
  chatLogBox: {
    height: '80%',
  },
  inputBox: {
    height: '10%',
  },
};

const Chat = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={styles.container}>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={styles.modalBox}>
          <CreateChat isModalOpen={isModalOpen} onClose={handleModalClose} />
        </Box>
      </Modal>
      <Grid container sx={styles.gridContainer}>
        <Grid size={4} sx={styles.leftGrid}>
          <Box sx={styles.userInfoBox}>
            <MemberInfo />
          </Box>
          <Box sx={styles.createChatBottun}>
            <Button
              variant="contained"
              onClick={handleModalOpen}
              fullWidth
              startIcon={<AddBox />}
            >
              Create chat
            </Button>
          </Box>
          <Box sx={styles.chatListBox}>
            <ChatList isModalOpen={isModalOpen} />
          </Box>
        </Grid>
        <Grid size={8} sx={styles.rightGrid}>
          <Box sx={styles.headerBox}>
            <ChatHeader />
          </Box>
          <Box sx={styles.chatLogBox}>
            <ChatLog />
          </Box>
          <Box sx={styles.inputBox}>
            <ChatInput />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
