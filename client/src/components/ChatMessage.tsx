import { blue, deepOrange, grey } from '@mui/material/colors';
import { Avatar, Box, Typography } from '@mui/material';

interface ChatMessageProps {
  type: 'SENT' | 'RECEIVED';
  content: string;
  timestamp: string;
}

const ChatMessage = ({ type, content, timestamp }: ChatMessageProps) => {
  const getMessageStyles = () => {
    switch (type) {
      case 'SENT':
        return {
          backgroundColor: blue[500],
          color: '#fff',
        };
      case 'RECEIVED':
        return {
          backgroundColor: grey[300],
          color: '#000',
        };
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: 1,
        maxWidth: '80%',
        alignSelf: type === 'SENT' ? 'flex-end' : 'flex-start',
        flexDirection: type === 'SENT' ? 'row-reverse' : 'row',
      }}
    >
      {type === 'RECEIVED' && (
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: '1.5em', height: '1.5em' }}
        >
          H
        </Avatar>
      )}

      <Box
        sx={{
          maxWidth: '70%',
          padding: 1.5,
          borderRadius: 3,
          ...getMessageStyles(),
        }}
      >
        <Typography variant="body2">{content}</Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: grey[500],
          whiteSpace: 'nowrap',
          alignSelf: 'flex-end',
          paddingBottom: 0.5,
        }}
      >
        {timestamp}
      </Typography>
    </Box>
  );
};

export default ChatMessage;
