import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

const SidebarArea = () => {
  return (
    <Grid container>
      {/* 회원 정보 */}
      <Grid size={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: 1 }}>
          <Avatar>U</Avatar>
          <Box>
            <Typography>your name</Typography>
            <Typography variant="caption">test@example.com</Typography>
          </Box>
        </Box>
      </Grid>

      {/* 참여중인 채팅 리스트 */}
      <Grid size={12}>
        <List sx={{ overflowY: 'auto', padding: 1 }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Chat With N"
              secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat."
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Grid>
    </Grid>
  );
};

export default SidebarArea;
