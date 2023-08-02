import React, { useEffect } from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useDynamic } from '../contexts/DynamicContext';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams} from 'react-router-dom';
import { EnterDonationsBox, PostDescription, PostDetailHeader, DonersList } from '.';


const Postdetail= () => {
  const params = useParams();
  const postId = params.id

  const { 
          postDetails,
          setPostDetails,
          doners
        } = useDynamic();

  // Lifecycle hook
  useEffect(() => {
    // Retrieving from session storage
    fetchFromAPI(`http://localhost:5000/api/v1/posts/${postId}`)
    .then((data) => {
      setPostDetails(data);
    })
    },[]);

  useEffect(() => {
    sessionStorage.setItem('postDetails', JSON.stringify(postDetails));
  }, [postDetails]);
  
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
    <Stack direction="column">
        <PostDetailHeader />
      <Stack direction="row" justifyContent="flex-center" sx={{ marginTop: '20px' }}>
      <Paper sx= {{ padding: '15px' }}>
        <PostDescription/>
      </Paper>
      <Paper sx={{ marginLeft:"50px", padding:"15px" }}>
        <EnterDonationsBox postId={postId}/>
        <Box 
          sx={{mt:'20px', mb:'10px'}}
          display={'flex'}
          justifyContent={'center'} 
          alignItems={'center'}
        >
          <Typography margin='auto' color='#9c27b0' variant='h6'>
            {doners.length} donations
          </Typography>
        </Box>
        <DonersList />
      </Paper>
    </Stack>
    </Stack>
  </Box>
  )
}

export default Postdetail