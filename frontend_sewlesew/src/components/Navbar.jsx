import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDynamic } from '../contexts/DynamicContext';
import { getToLogoutAPI } from '../utils/getToLogoutAPI'
import { toast } from 'react-toastify';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Avatar } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { getUserData } from '../utils/getUserData';

const Navbar = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { isLoggedIn,
          setIsLoggedIn,
          pendingdonationsCount, 
          notificationsCount, 
          unreadCount, 
          resetUnreadCount, 
          resetNotificationsCount, 
          resetPendingdonationsCount,
          sessionToken,
          setSessionToken,
          setUsername,
          username,
          profilePic,
          userPendingDonations,
          setUserPendingDonations,
          setNotificationsCount,
          pendingDonationCounter,
        } = useDynamic();

    // Lifecycle hook
    const fetchUserPendingDonations = async () => {
    const url = 'http://localhost:5000/api/v1/users/pending-donations';
    const headers = {"session_id": sessionToken};
    await getUserData(url, headers)
    .then((response) => {
      setUserPendingDonations(response.data);
    })
    .catch((error) => { alert(error) });
  }
  
  useEffect(() => {
    fetchUserPendingDonations()
  },[pendingDonationCounter, isLoggedIn])
  
  // Saving userDonations to session storage
  useEffect(() => {
    userPendingDonations? sessionStorage.setItem('userPendingDonations', JSON.stringify(userPendingDonations)) : sessionStorage.setItem('userPendingDonations', []);
  }, [userPendingDonations]);

  useEffect(() => {
    userPendingDonations? sessionStorage.setItem('pendingdonationsCount', JSON.stringify(pendingdonationsCount)) : sessionStorage.setItem('pendingdonationsCount', 0);
  }, [pendingdonationsCount]);


  // Reseting the pending donations counter to zero, if their are no pending donations
  useEffect(() => {
    let length_userPendingDonations = userPendingDonations? userPendingDonations.length : 0;
    if (length_userPendingDonations === 0) {
      // resetPendingdonationsCount();
      setNotificationsCount(0); 
    }
    else {
      setNotificationsCount(length_userPendingDonations);
    }
    // if (pendingdonationsCount === 0) {
    //   resetPendingdonationsCount();
    // }
  }, [userPendingDonations])
  
  // pendingdonationsCount
  
  // Retrieving from session storage
  useEffect(() => {
    const loggedInStatus = JSON.parse(sessionStorage.getItem('isLoggedIn'));
    setIsLoggedIn(loggedInStatus);
  }, []);
  
  // Save session token to session storage
  useEffect(() => {
      sessionStorage.setItem('sessionToken', sessionToken);
    }, [sessionToken]);
  
  // Saving logged in status to session storage
  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const theme = createTheme({
    zIndex: {
      drawer: 1000,
    },
  });

  const renderLoggedInCompnents = () => {
    if (isLoggedIn) {
      return (
        <>
            <Button color="inherit">Logout</Button>
            <p id="chats-count">{ unreadCount }</p>
            <p id="notifications-count">{ notificationsCount }</p>
            <p id="pending-donations-count">{ pendingdonationsCount }</p>
        </>
      )
    }
      else {
        return <Button color="inherit">Login</Button>
      }
  }
  // let loginButton;
  // if (isLoggedIn) {
  //   loginButton = 'Logout';
  // } else {
  //   loginButton = 'Login'
  // }
  const navigate = useNavigate();
  const navigateToLogin = () => {
      navigate("/login")
  }

  const logoutUser = async() => {
    const url = 'http://localhost:5000/api/v1/logout';
    const headers = {"session_id": sessionToken};
    return (await getToLogoutAPI(url, headers)
    .then((response) => { 
        // Get the session token from the response
        setIsLoggedIn(false)
        // Save the session_id to a state
        setSessionToken('');
        toast(response.data)
        // Setting profile details
        setUsername('');
        // Redirect to login page
        navigateToLogin();
        
    })
    .catch((error) => { alert(error) }))
  }

  const navigateToCreatePost = () => {
    navigate("/postuploadform")
  }

  const createPost = async() => {
    navigateToCreatePost();
  }

const dynamicNavLink = () => {
  if (isLoggedIn) {
    return (
      <>
        <Button onClick={ logoutUser } color="inherit">
          <NavLink style={navLinkStyle}>Logout</NavLink>
        </Button>
        {/* <Typography>{`Welcome ${username}`}</Typography> */}
        {profilePic ? 
          <Avatar>{username.slice(0, 2).toUpperCase()}</Avatar> :
          <Avatar sx={{ bgcolor: "#9c27b0" }}>{username.slice(0, 2).toUpperCase()}</Avatar>
        }
      </>
    )} else {
    return (
      <>
        <Button onClick={ navigateToLogin } color="inherit">
          <NavLink style={navLinkStyle}>Login</NavLink>
        </Button>
      </>
    )}
}

const displayNotificationCount = () => {
  if (isLoggedIn) {
    return (
      <>
        {/* <p id="pending-donations-count">{ pendingdonationsCount }</p> */}
        <p id="pending-donations-count">{ notificationsCount }</p>
      </>
    )
  }
}
  const navLinkStyle = {color: '#9c27b0', textDecoration: 'none'}
  return (
    <Box class='sticky' sx={{ flexGrow: 1 }}>
      <AppBar color='inherit'>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span class="color logo" >Sew</span>
            <span class="gray-color logo" >Le</span>
            <span class="color logo">Sew</span>
          </Typography>
          {/* <Button color="inherit" onClick={ resetUnreadCount }><ChatIcon /></Button> */}
          {isLoggedIn ? 
            <Button color="secondary" onClick={ createPost }>
              <AddCircleOutlinedIcon />
            </Button> : ""
          }
          {/* <Button onClick={ resetNotificationsCount }color="inherit">
            <NotificationsIcon />
          </Button> */}
          
          {isLoggedIn ? 
            // <Button onClick={()=>{resetPendingdonationsCount()}}>
            <Button>
              <NavLink style={navLinkStyle} to='/userpendingdonations'> 
                <VolunteerActivismIcon color="secondary"/>
              </NavLink>
              { displayNotificationCount() }
            </Button> : ""
          }
          
          <Button color="secondary">
            <NavLink style={navLinkStyle} to='/'> Posts </NavLink>
          </Button>
          {isLoggedIn ? 
            <Button>
              <NavLink style={navLinkStyle} to='/userdonations'> Profile </NavLink>
            </Button> : ""}
          {/* {renderLoggedInCompnents() } */}
            { dynamicNavLink() }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar
