import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import StandardImageList from './StandardImageList'
import { useDynamic } from '../contexts/DynamicContext';
import video from '../sample_video.mp4'


const PostDescription = () => {
const { 
    postDetails
  } = useDynamic();
  return (
    <Stack direction="column" justifyContent="flex-center">
        <Stack direction="row" gap={'10px'} pb='0px'>
        <Box  width="300px" sx={{ marginTop: '50px' }}>
            <Typography variant="subtitle1"
            fontweight="bold" color="gray">
                { postDetails?.description }
            </Typography>
        </Box>
        <StandardImageList />
        </Stack>
        <video width="800" height="400" controls style={{ margin: '0px', marginTop: '20px' }}>
            <source src={video} type="video/mp4"/>
        </video>
    </Stack>
  )
}

export default PostDescription