import { Typography } from '@mui/material'
import React from 'react'
import { useDynamic } from '../contexts/DynamicContext';

const PostDetailHeader = () => {

const {
    postDetails,
    } = useDynamic();

  return (
    <Typography variant="h4" align='center'
        fontweight="bold" color="#9c27b0">
          { postDetails?.title }
          <Typography variant="h6"
            fontweight="bold" color="gray">
              {postDetails?.User?.firstName} {postDetails?.User?.lastName}
        </Typography>
      </Typography>
  )
}

export default PostDetailHeader