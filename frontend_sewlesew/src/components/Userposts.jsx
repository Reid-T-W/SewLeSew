import { Typography, Link, Grid, Button } from '@mui/material'
import { Userdonations, Userpendingdonations, Usereditprofile, StickyHeadTableForUserPosts, Userprofileoptions} from '.'
import { useEffect } from 'react';
import { useDynamic } from '../contexts/DynamicContext';

const Userposts = () => {
  const {
    userPosts
    } = useDynamic();
  // Saving userPosts to session storage
  useEffect(() => {
    sessionStorage.setItem('userPosts', JSON.stringify(userPosts));
  }, [userPosts]);
  return (
    <>
      <Grid mt='50px' align='center'>
        <Userprofileoptions />
        <Typography mt='20px'> Posts </Typography>
      </Grid>
      <Grid mt="30px">
          <StickyHeadTableForUserPosts />
      </Grid>
    </>
  )
}

export default Userposts