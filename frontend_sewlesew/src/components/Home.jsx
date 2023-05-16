import { Box, Grid } from '@mui/material';
import { Navbar, SearchBar, Postsfeed, Filters } from './';
import { useEffect } from 'react';

const Home = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        marginTop='20px'
        // style={{ minHeight: '100vh' }}
      >
        <Box>
          <SearchBar />
        </Box>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        mt='20px'
        style={{ minHeight: '100vh' }}
      >
        {/* <Filters /> */}
          <Postsfeed />
      </Grid>
    </>
  )
}

export default Home