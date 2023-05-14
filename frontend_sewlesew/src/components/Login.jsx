import React, { useEffect } from 'react'
import { Checkbox, Grid,Paper, Avatar, TextField, 
Button, Typography, Link, FormControlLabel, Stack } from'@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDynamic } from '../contexts/DynamicContext';
import { postToLoginAPI } from '../utils/postToLoginAPI';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Postsfeed } from './';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
  
    const navigateToPostsFeed = () => {
        navigate("/")
    }
    const {
        username,
        setUsername,
        password,
        setPassword,
        isLoggedIn,
        setIsLoggedIn,
        sessionToken,
        setSessionToken,
        setEmail,
        setFirstName,
        setLastName } = useDynamic();

    const loginUser = async() => {
        const url = 'http://localhost:5000/api/v1/login';
        const data = { username, password }
        return (await postToLoginAPI(url, data)
        .then((response) => {
            // Get the session token from the response
            setIsLoggedIn(true)
            // Save the session_id to a state
            setSessionToken(response.session_id);
            toast.success(response.data)
            // Setting profile details
            setUsername(response.userData.username);
            setFirstName(response.userData.firstName);
            setLastName(response.userData.lastName);
            setEmail(response.userData.email);
            navigateToPostsFeed();
            // Redirect to postfeeds page
            // const history = useHistory();
        })
        .catch((error) => {
            // console.log(error);
            toast.error(String(error));
        }))
    }

    // useEffect(() => {
    //     sessionStorage.setItem('sessionToken', JSON.stringify(sessionToken));
    //   }, [sessionToken]);
    const paperStyle={padding :20, height:'75vh', width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#5800FF'}
    const btn={margin:'8px 0'}
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Stack gap='20px'>
                    <Grid  align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField onChange={ (e)=>{ setUsername(e.target.value) } } label='Username' placeholder='Enter username' fullWidth required/>
                    <TextField onChange={ (e)=>{ setPassword(e.target.value) } } label='Password' placeholder='Enter password' type='password' fullWidth required/>
                    <FormControlLabel
                    control={
                    <Checkbox
                        name='checkedB'
                        color='primary'
                    />
                    }
                    label="Remember me"
                />
                    <Button onClick={ loginUser } type='submit' color='primary' variant="contained" style={btn} fullWidth>Sign in</Button>
                    <Typography >
                        <NavLink to={'/resetpassword'}>
                            Forgot Password ?
                        </NavLink>
                    </Typography>
                    <Typography > Do you have an account ?
                        <NavLink to='/signup'>
                            Sign Up
                        </NavLink>
                    </Typography>
                    <Button type='submit' color='error' variant="contained" style={btn} fullWidth>Sign in with google</Button>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default Login