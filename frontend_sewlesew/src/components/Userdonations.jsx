import { Typography, Link, Grid } from '@mui/material'
import { Userpendingdonations, Userposts, Usereditprofile, StickyHeadTableForUserDonations, Userprofileoptions } from '.'
import { NavLink } from 'react-router-dom'
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { useEffect } from 'react'
import { useDynamic } from '../contexts/DynamicContext'

const Userdonations = () => {
  const {
    userDonations
    } = useDynamic();

  // Saving userDonations to session storage
  useEffect(() => {
    sessionStorage.setItem('userDonations', JSON.stringify(userDonations));
  }, [userDonations]);
  return (
    <>
      <Grid mt='50px' align='center'>
      <Userprofileoptions />
      <Typography mt='20px'> Donations </Typography>
      </Grid>
      <Grid mt="30px">
        <StickyHeadTableForUserDonations />
      </Grid>
    </>
  )
}

export default Userdonations
