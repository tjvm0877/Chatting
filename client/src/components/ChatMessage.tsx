import { blue, deepOrange, green, grey } from '@mui/material/colors';
import { Message } from '../types/Message';
import { Avatar, Box, Typography } from '@mui/material';

const ChatMessage = ({ type, content, timestamp }: Message) => {
  const getMessageStyles = () => {
    switch (type) {
      case 'sent':
        return {
          backgroundColor: blue[500],
          color: '#fff',
        };
      case 'received':
        return {
          backgroundColor: green[500],
          color: '#fff',
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
        alignSelf: type === 'sent' ? 'flex-end' : 'flex-start',
        flexDirection: type === 'sent' ? 'row-reverse' : 'row',
      }}
    >
      {type === 'received' && (
        <Avatar sx={{ bgcolor: deepOrange[500], width: '2em', height: '2em' }}>
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
