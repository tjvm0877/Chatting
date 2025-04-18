import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import ChatMessage from './ChatMessage';
import { Message } from '../types/Message';

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

const ChatLog = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: grey[100],
        overflowY: 'auto',
      }}
    >
      {messages.map((msg, index) => (
        <ChatMessage key={index} {...msg} />
      ))}
    </Box>
  );
};

export default ChatLog;
