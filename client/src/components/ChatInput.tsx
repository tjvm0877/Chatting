import { Send } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';

const ChatInput = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: 1,
        boxSizing: 'border-box',
      }}
    >
      <TextField fullWidth placeholder="Send a message" />
      <Button variant={'contained'} startIcon={<Send />}>
        send
      </Button>
    </Box>
  );
};

export default ChatInput;
