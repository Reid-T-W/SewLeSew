import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Posts } from './';
import { useDynamic } from "../contexts/DynamicContext";

const Postsfeed = () => {

    const {
      posts,
      setPosts 
    } = useDynamic();

    // Lifecycle hook
    useEffect(() => {
      // Retrieving from session storage
      fetchFromAPI(`http://localhost:5000/api/v1/posts`)
      .then((data) => {
        setPosts(data)     
      })
      },[]);

    // Saving to session storage whenever there is a
    // change to posts state
    useEffect(() => {
      sessionStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);
  

  return (
    <>
        <Box p={2} sx={{ overflow: 'auto', height: '90vh',
        flex: 2}}>
            <Posts posts={posts}/>
        </Box>
    </>
  )
}

export default Postsfeed
