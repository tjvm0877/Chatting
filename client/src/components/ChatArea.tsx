import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Message } from '../types/Message';
import ChatMessage from './ChatMessage';

const messages: Message[] = [
  { type: 'received', content: 'Hello! How are you?', timestamp: '10:01 PM' },
  {
    type: 'sent',
    content: "I'm good, thank you! And you?",
    timestamp: '10:02 PM',
  },
  { type: 'received', content: "I'm doing well too!", timestamp: '10:03 PM' },
  { type: 'received', content: 'Hello! How are you?', timestamp: '10:01 PM' },
  {
    type: 'sent',
    content: "I'm good, thank you! And you?",
    timestamp: '10:02 PM',
  },
  { type: 'received', content: "I'm doing well too!", timestamp: '10:03 PM' },
  { type: 'received', content: 'Hello! How are you?', timestamp: '10:01 PM' },
  {
    type: 'sent',
    content: "I'm good, thank you! And you?",
    timestamp: '10:02 PM',
  },
  { type: 'received', content: "I'm doing well too!", timestamp: '10:03 PM' },
  { type: 'received', content: 'Hello! How are you?', timestamp: '10:01 PM' },
  {
    type: 'sent',
    content: "I'm good, thank you! And you?",
    timestamp: '10:02 PM',
  },
  { type: 'received', content: "I'm doing well too!", timestamp: '10:03 PM' },
  { type: 'received', content: 'Hello! How are you?', timestamp: '10:01 PM' },
  {
    type: 'sent',
    content: "I'm good, thank you! And you?",
    timestamp: '10:02 PM',
  },
  { type: 'received', content: "I'm doing well too!", timestamp: '10:03 PM' },
  { type: 'received', content: 'Hello! How are you?', timestamp: '10:01 PM' },
  {
    type: 'sent',
    content: "I'm good, thank you! And you?",
    timestamp: '10:02 PM',
  },
  { type: 'received', content: "I'm doing well too!", timestamp: '10:03 PM' },
];

const ChatArea = () => {
  return (
    <Grid container>
      {/* 채팅 해더 */}
      <Grid size={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2 }}>
          <Typography variant="h5">Hello, World!</Typography>
        </Box>
      </Grid>
      {/* 채팅 로그 */}
      <Grid size={12}>
        <Box
          sx={{
            height: '80vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {messages.map((msg, index) => (
            <ChatMessage key={index} {...msg} />
          ))}
        </Box>
      </Grid>

      {/* 채팅 입력 */}
      <Grid size={12}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            multiline
            rows={1}
            maxRows={2}
            placeholder="Type your message..."
            variant="outlined"
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
            }}
          />
          <Button variant="contained">Send</Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChatArea;
