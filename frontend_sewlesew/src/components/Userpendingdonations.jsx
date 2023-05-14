import { Typography, Link, Grid, Button } from '@mui/material'
import { Userdonations, Userposts, Usereditprofile, StickyHeadTableForUserPendingDonations, Userprofileoptions} from '.'
import { useDynamic } from '../contexts/DynamicContext';
import { useEffect } from 'react';
import { donateViaChapa } from '../utils/donateViaChapa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postDonationsToAPI } from '../utils/postDonationsToAPI'

const Userpendingdonations = () => {
  const {
    email,
    firstName,
    lastName,
    userPendingDonations,
    setPendingdonationsCount,
    pendingdonationsCount,
    sessionToken
    } = useDynamic();
  const navigate = useNavigate();
  // Saving userDonations to session storage
  useEffect(() => {
    sessionStorage.setItem('userPendingDonations', JSON.stringify(userPendingDonations));
  }, [userPendingDonations]);

  useEffect(() => {
    sessionStorage.setItem('pendingdonationsCount', JSON.stringify(pendingdonationsCount));
  }, [pendingdonationsCount]);

  const postIndividualPendingDonation = async (pendingDonation) => {
    const url = `http://localhost:5000/api/v1/posts/${pendingDonation.Post.id}/donations`;
    const data = { pendingDonationId: pendingDonation.id }
    console.log(data)
    const headers = {"session_id": sessionToken};
    return (await postDonationsToAPI(url, data, headers)
    .then((response) => {
        console.log("in here")
        // toast.success(response.data)
    })
    .catch((error) => {
        // console.log(error);
        toast.error(String(error));
    }))
  }

  const transferPendingDonationsToDonations = async ()=>{
    userPendingDonations.map((pendingDonation) => {
      postIndividualPendingDonation(pendingDonation);
    })
    setPendingdonationsCount(0);
}

  const paymentCheckout = async () => {
    // let totalPendingDonations = 0;
    // userPendingDonations.map((pendingDonation) => {totalPendingDonations += pendingDonation.amount})
    // // Make api call to backend
    // const url = 'http://localhost:5000/api/v1/payViaChapa';
    // const headers = {"session_id": sessionToken};
    // const data = {
    //   email,
    //   firstName,
    //   lastName,
    //   totalPendingDonations,
    // }
    // return (await donateViaChapa(url, data, headers)
    // .then((url)=>{
    //   return url
    // }))
  }

  const donate = async ()=>{
        // Sum items in the pending donations table and proceed to checkout
        let totalPendingDonations = 0;
        userPendingDonations.map((pendingDonation) => {totalPendingDonations += pendingDonation.amount})
        // Make api call to backend
        const url = 'http://localhost:5000/api/v1/payViaChapa';
        const headers = {"session_id": sessionToken};
        const data = {
          email,
          firstName,
          lastName,
          totalPendingDonations,
        }
        return (await donateViaChapa(url, data, headers)
        .then((url)=>{
          if (url.data.status === 200) {
            // Add all pending donations to donations table
            transferPendingDonationsToDonations();
            const checkoutUrl = url.data.data;
            // console.log(checkoutUrl);
            window.location.replace(checkoutUrl)
            // toast.success("Donation successful");
          }
        })
        .catch((error) => {console.log(error)})
        //Execute the following when promise is resolved
      )
    // // Sum items in the pending donations table and proceed to checkout
    // let totalPendingDonations = 0;
    // userPendingDonations.map((pendingDonation) => {totalPendingDonations += pendingDonation.amount})
    // // Make api call to backend
    // const url = 'http://localhost:5000/api/v1/payViaChapa';
    // const headers = {"session_id": sessionToken};
    // const data = {
    //   email,
    //   firstName,
    //   lastName,
    //   totalPendingDonations,
    // }
    // return (await donateViaChapa(url, data, headers)
    // .then((response)=>{
    //   console.log(response)
    //   if (response.data.status === 200) {
    //     // Add all pending donations to donations table
    //     // console.log("In here")
    //     transferPendingDonationsToDonations()
    //     const checkoutUrl = url.data.data;
    //     // console.log(checkoutUrl);
    //     window.location.replace(checkoutUrl)
    //   }
    // }).catch((error)=>{
    //   console.log(error);
    // }))





    // const url = await paymentCheckout()
    // .then((url)=>{
    //   console.log("In hereeeeeeeeeeeeeeeeeeee")
    //   if (url.data.status === 200) {
    //     // Add all pending donations to donations table
    //     // console.log("In here")
    //     transferPendingDonationsToDonations()
    //     .then(()=>{
    //       // toast.success("Donation successful");
    //       const checkoutUrl = url.data.data;
    //       // console.log(checkoutUrl);
    //       window.location.replace(checkoutUrl)
    //     })
    //   }
    // })
    // .catch((error)=>{
    //   console.log(error);
    // })
}
  const btn={margin:'8px 0'}
  return (
    <>
      <Grid mt='50px' align='center'>
        <Userprofileoptions />
        <Typography mt='20px'> Pending Donations </Typography>
      </Grid>
      <Grid mt="30px">
        < StickyHeadTableForUserPendingDonations />
        <Button onClick={donate} type='submit' color='primary' variant="contained" style={btn} fullWidth>Donate</Button>
      </Grid>
    </>
  )
}

export default Userpendingdonations