import React from 'react'
import { Checkbox, Grid,Paper, Avatar, TextField, 
Button, Typography, Link, FormControlLabel, Stack } from'@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDynamic } from '../contexts/DynamicContext';
import { postToAPI } from '../utils/postToAPI';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const { email,
            setEmail,
            password,
            setPassword,
            confirmPassword,
            setConfirmPassword,
            username,
            setUsername,
            firstName,
            setFirstName,
            lastName,
            setLastName,
            role,
            setRole } = useDynamic();

    const registerUser = async() => {
        const url = 'http://localhost:5000/api/v1/register';
        const data = { email, password, confirmPassword, username, firstName, lastName, role}
        return (await postToAPI(url, data)
        .then((response) => { 
                             toast.success(response.data) 
                            })
        .catch((error) => { 
                            toast(String(error))
                          }))
    }
    const paperStyle={padding :20, height:'80vh', width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#5800FF'}
    const btn={margin:'8px 0'}
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Stack gap='10px'>
                    <Grid  align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Sign Up</h2>
                    </Grid>
                    <TextField onChange={ (e)=>{ setEmail(e.target.value) } } label='Email' placeholder='Enter Email' fullWidth required/>
                    <TextField onChange={ (e)=>{ setUsername(e.target.value) } }label="Username" placeholder="Enter Username" fullWidth required/>
                    <TextField onChange={ (e)=>{ setFirstName(e.target.value) } } label='First Name' placeholder='Enter First Name' fullWidth required/>
                    <TextField onChange={ (e)=>{ setLastName(e.target.value) } } label='Last Name' placeholder='Enter Last Name' fullWidth required/>
                    <TextField onChange={ (e)=>{ setPassword(e.target.value) } } label='Password' placeholder='Enter password' type='password' fullWidth required/>
                    <TextField onChange={ (e)=>{ setConfirmPassword(e.target.value) } } label='Confirm Password' placeholder='Confirm password' type='password' fullWidth required/>
                    <Button onClick={ registerUser } type='submit' color='primary' variant="contained" style={btn} fullWidth>Sign Up</Button>
                    <Typography ><span>Continue to  </span>
                        <NavLink to='/login'>
                            <span>Login</span>
                        </NavLink>
                    </Typography>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default Signup