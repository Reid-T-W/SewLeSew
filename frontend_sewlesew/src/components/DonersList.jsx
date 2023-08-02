import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Doner } from '.';
import { Box, ListItemButton } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { useDynamic } from '../contexts/DynamicContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useState } from 'react';

function renderRow(props) {
  const { index, style, data } = props;
  const doner = data.doners[index]


  return (
    <ListItem component="div" disablePadding>
      {/* <ListItemButton> */}
        {/* <ListItemText primary={`Item ${index + 1}`} /> */}
        {/* {[1,2,3].forEach(doner => {
            
          }
        )} */}
        <Doner doner={doner}/>
        {/* <Divider variant="inset" component="li" /> */}
      {/* </ListItemButton> */}
    </ListItem>
  );
}

const DonersList = () => {
  const { postDetails, setDoners, doners } = useDynamic();
  const params = useParams();
  const postId = params.id
  useEffect(()=>{
    // Make api call to get all donations
    // for this post
    const url = `http://localhost:5000/api/v1/posts/${postId}/donations`;
    fetchFromAPI(url)
    .then((doners)=>{
      console.log("In doners list: ", doners)
      setDoners(doners)
    })
    .catch((error)=>{
      console.log(error)
    })

  },[])
  return (
    <Box
      sx={{ 
        width: '100%',
        height: 400,
        maxWidth: 360,
        bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={430}
        width={360}
        itemSize={150}
        itemCount={doners.length}
        overscanCount={5}
        itemData={{ doners }}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
export default DonersList