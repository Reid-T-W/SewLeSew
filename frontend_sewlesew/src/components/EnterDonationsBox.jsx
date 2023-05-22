import { Box, Button, LinearProgress, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { currencyFormat } from '../utils/currencyFormatter'
import { useDynamic } from '../contexts/DynamicContext';
import { postPendingDonationToAPI } from '../utils/postPendingDonationToAPI';
import { toast } from 'react-toastify';
import { donationProgress } from '../utils/donationProgressCalc';
import { useParams } from 'react-router-dom';

const EnterDonationsBox = ({postId}) => {

const { isLoggedIn,
    postDetails,
    incrementPendingdonationsCount,
    sessionToken  } = useDynamic();
const [pendingDonationEntry, setPendingDonationEntry] = useState(0);

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
  return (
    <Paper>
        <Stack gap="30px" p="20px" alignContent={true}>
            <Box display={'flex'} justifyContent={'center'}>
                <Typography variant="h6" color="#9c27b0">
                Raised
                </Typography>
            </Box>
            <Stack spacing="10px" justifyContent='center' alignItems='center'>
                <Typography variant="subtitle1"
                fontweight="bold" color="gray">
                    {postDetails && currencyFormat(postDetails?.totalRaised)} / {currencyFormat(postDetails?.amount)}
                </Typography>
            </Stack>
            <Box sx={{ width: '100%', marginBottom: '20px', marginRight: 'auto', marginLeft: 'auto'}}>
                {postDetails && <LinearProgress sx={{ borderRadius:'5px', height: '7px'}} variant='determinate' value={donationProgress(postDetails?.totalRaised, postDetails?.amount)} color='secondary' />}
            </Box>
            <TextField onChange={(e)=>{setPendingDonationEntry(e.target.value)}} id="outlined-basic" label="Amount"
            variant="outlined" placeholder="Amount"/>
            <Button onClick={ addToPendingDonations } variant="contained" color="secondary" >Add to donations</Button>
        </Stack>
    </Paper>
  )
}

export default EnterDonationsBox