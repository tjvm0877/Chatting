import { AddBox } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const UserInfo = () => {
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
        <Avatar>Y</Avatar>
        <Box>
          <Typography fontWeight="bold">yourName</Typography>
          <Typography variant="caption" color="text.secondary">
            test@example.com
          </Typography>
        </Box>
      </Box>
      <IconButton>
        <AddBox />
      </IconButton>
    </Box>
  );
};

export default UserInfo;
