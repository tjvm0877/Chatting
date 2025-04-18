import { Menu } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

const ChatHeader = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5">Button</Typography>
      </Box>
      <IconButton>
        <Menu />
      </IconButton>
    </Box>
  );
};

export default ChatHeader;
