import { Typography, Link, Grid, Button } from '@mui/material'
import { Userdonations, Userpendingdonations, Userposts, Usereditprofile} from '.'
import { NavLink } from 'react-router-dom'
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap"

const navLinkStyle = {color: 'gray', textDecoration: 'none'}
const navLinkActiveStyle = {textDecoration: 'underline'}
const Userprofileoptions = () => {
  return (
    <Grid mt='50px' align='center'>
    <Typography>
        <NavLink style={navLinkStyle} to='/userdonations'>
            DONATIONS
        </NavLink>
        <NavLink style={navLinkStyle} to='/userpendingdonations'> |
            PENDING DONATIONS
        </NavLink>
        <NavLink style={navLinkStyle} to='/userposts'> |
            POSTS
        </NavLink>
        <NavLink style={navLinkStyle} to='/edituserprofile'> |
            UPDATE PROFILE
        </NavLink>
    </Typography>
    </Grid>
  )
}

export default Userprofileoptions