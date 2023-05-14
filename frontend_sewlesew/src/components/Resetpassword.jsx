import React from 'react'
import { Checkbox, Grid,Paper, Avatar, TextField, 
Button, Typography, Link, FormControlLabel, Stack } from'@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDynamic } from '../contexts/DynamicContext';
import { postToAPI } from '../utils/postToAPI';
import { NavLink } from 'react-router-dom'


const Resetpassword = () => {
    const { email,
            setEmail} = useDynamic();
    const sendResetEmail = async() => {
        const url = 'http://localhost:5000/api/v1/reset-password';
        const data = { email }
        return (await postToAPI(url, data)
        .then((response) => { alert(response) })
        .catch((error) => { alert(error) }))
        // .then(() => alert(`${email} registered successfully`))
        // .catch((error) => alert(error));
    }
    const paperStyle={padding :20, height:'55vh', width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#5800FF'}
    const btn={margin:'8px 0'}
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Stack gap='10px'>
                    <Grid  align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Reset Password</h2>
                    </Grid>
                    <Grid mt='30px'>
                        <TextField onChange={ (e)=>{ setEmail(e.target.value) } } label='Email' placeholder='Enter Email' fullWidth required/>
                    </Grid>
                    <Grid mt="110px" align='center'>
                        <Typography >
                            <NavLink to={'/login'} >
                                Return to Login
                            </NavLink>
                        </Typography>
                    </Grid>
                    <Button onClick={ sendResetEmail } type='submit' color='primary' variant="contained" style={btn} fullWidth>Reset Password</Button>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default Resetpassword