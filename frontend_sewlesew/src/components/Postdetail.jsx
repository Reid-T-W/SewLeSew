import React, { useEffect, useState } from 'react'
import { Box, CardMedia, Stack, Typography } from '@mui/material';
import image1 from '../image1.jpg';
import video from '../sample_video.mp4'
import { messages } from '../utils/constants'
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDynamic } from '../contexts/DynamicContext';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import { SettingsInputCompositeTwoTone } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { postPendingDonationToAPI } from '../utils/postPendingDonationToAPI'

const Postdetail= () => {
  const params = useParams();
  // console.log(params.id)
  const postId = params.id

  const { isLoggedIn,
          postDetails,
          setPostDetails,
          incrementPendingdonationsCount,
          sessionToken  } = useDynamic();
  // Lifecycle hook
  useEffect(() => {
    // Retrieving from session storage
    fetchFromAPI(`http://localhost:5000/api/v1/posts/${postId}`)
    .then((data) => {
      console.log(data);
      setPostDetails(data);
    })
    },[]);

  useEffect(() => {
    sessionStorage.setItem('postDetails', JSON.stringify(postDetails));
  }, [postDetails]);

    const donationProgress = () => {
      const value = (postDetails.totalRaised / postDetails.amount) * 100;
      return value;
    }

    const apiCallToAddPendingDonation = async() => {
      const url = `http://localhost:5000/api/v1/posts/${postId}/pending-donations`;
      const data = { amount: pendingDonationEntry }
      const headers = {"session_id": sessionToken};
      return (await postPendingDonationToAPI(url, data, headers)
      .then((response) => {
          toast.success(response.data)
          incrementPendingdonationsCount();
      })
      .catch((error) => {
          // console.log(error);
          toast.error(String(error));
      }))
  }

  const addToPendingDonations = () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to donate")
    }
    else {
      apiCallToAddPendingDonation()
    }
  }

  const [pendingDonationEntry, setPendingDonationEntry] = useState(0);
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
    <Stack direction="row">
    <Stack direction="column" justifyContent="flex-center">
      <Typography variant="subtitle1"
        fontweight="bold" color="#3E6D9C">
          Post Details
      </Typography>
      <Typography variant="h5"
        fontweight="bold" color="#3E6D9C">
          {/* {console.log(postDetails)} */}
          { postDetails.title }
      </Typography>
      <Stack direction="row" gap={'10px'} pb='0px'>
        <Box  width="300px" sx={{ marginTop: '50px' }}>
          <Typography variant="subtitle1"
            fontweight="bold" color="#3E6D9C">
              { postDetails.description }
          </Typography>
        </Box>
        <video width="500" height="400" controls style={{ margin: '0px' }}>
          <source src={video} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
    </Stack>
    <Stack direction="row" gap={'110px'} sx={{ marginTop: '50px' }}>
          <Box
            component="img"
            sx={{
              height: 350,
              width: 350,
              maxHeight: { xs: 233, md: 350 },
              maxWidth: { xs: 350, md: 350 },
            }}
            alt="A man requiring medical care"
            src={postDetails['Pictures']? postDetails["Pictures"][0].pictureFile:""}
          />
          <Box
            component="img"
            sx={{
              height: 350,
              width: 350,
              maxHeight: { xs: 233, md: 350 },
              maxWidth: { xs: 350, md: 350 },
            }}
            alt="A man requiring medical care"
            src={postDetails['Pictures']? postDetails["Pictures"][0].pictureFile:""}
          />
        </Stack>
  </Stack>
  <Box sx={{ height: 350, width: 350 }} display="flex" justifyContent="center">
    <Stack gap="30px" pt="115px" pl="50px">
      Raised {postDetails.totalRaised} birr out of {postDetails.amount} birr
      <LinearProgress variant='determinate' value={donationProgress()} color='success' />
      <TextField onChange={(e)=>{setPendingDonationEntry(e.target.value)}} id="outlined-basic" label="Amount" variant="outlined" placeholder="Amount"/>
      <Button onClick={ addToPendingDonations } variant="contained">Add to donations</Button>
      {/* <Button variant="contained">Message</Button> */}
    </Stack>
  </Box>
  </Stack>
  </Box>
  )
}

export default Postdetail