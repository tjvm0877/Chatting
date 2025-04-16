import { Grid } from '@mui/material';
import ChatArea from '../components/ChatArea';
import SidebarArea from '../components/SideBarArea';

const Home = () => {
  return (
    <>
      <Grid
        container
        sx={{ height: '100%', width: '100%', overflow: 'hidden' }}
      >
        <Grid size={9} sx={{ height: '100%' }}>
          <ChatArea />
        </Grid>
        <Grid size={3} sx={{ height: '100%' }}>
          <SidebarArea />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
