import React, { useState } from 'react'
import { Grid,Paper, TextField, 
  Button, Stack } from'@mui/material'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { MultipleOptions, ImageUpload } from './';
import { useDynamic } from '../contexts/DynamicContext';
import { postProductToAPI } from '../utils/postProductToAPI';
import { toast } from 'react-toastify';
import { deleteUser } from '../utils/deleteUser';
import { Navigate, useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const {
        sessionToken,
        setIsLoggedIn,
        setTitleNewPost,
        setDescriptionNewPost,
        setAmountNewPost,
        setLocationNewPost,
        setCategoryNewPost,
        titleNewPost,
        descriptionNewPost,
        amountNewPost,
        locationNewPost,
        categoryNewPost,
        imageNewPost,
        videoNewPost,
        documentNewPost
    } = useDynamic();
    
      const updateProfile = async() => {
        const url = 'http://localhost:5000/api/v1/users';
        const headers = {"session_id": sessionToken};
        const updatedValues = [firstName, lastName, password]
        const filteredUpdatedValues = updatedValues.filter((value)=>{return value!==''})
        if (filteredUpdatedValues.length === 0) {
            toast.error("All fields are empty, please modify at least one")
            return
        }
        // {filteredUpdatedValues[i]; (for i in range(0, len(lst)))}
        // dict(updatedValues.map((value) => value))
        // const data = {
        //   title: titleNewPost,
        //   description: descriptionNewPost,
        //   amount: amountNewPost,
        //   totalRaised: -1,
        //   location: locationNewPost,
        //   category: categoryNewPost,
        //   pictureFile: imageNewPost,
        //   videoFile: videoNewPost,
        //   documentFile: documentNewPost
        // }
        
        // return (await postProductToAPI(url, data, headers)
        // .then((response) => {
    
        //   toast.success(response.data)
    
        // })
        // .catch((error) => {
        //     toast.error(String(error));
        // }))
      }
      const navigate = useNavigate();
      const navigateToLogin = () => {
        navigate("/login")
      }

      const deleteProfile = async()=>{
        const url = 'http://localhost:5000/api/v1/users';
        const headers = {"session_id": sessionToken};
        return (await deleteUser(url, headers)
        .then((response) => {
    
          toast.success(response.data)
          // set is logged in to false
          setIsLoggedIn(false)
          // redirect to login screen
          navigateToLogin();
        })
        .catch((error) => {
            toast.error(String(error));
        }))
      }
    
      const paperStyle={padding :20, height:"auto", width:600, margin:"20px auto"}
      const btn={margin:'8px 0'}
      return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Stack gap='20px'>
                    <Grid  align='center'>
                        {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
                        {/* <h2>Update Profile</h2> */}
                    </Grid>
                    <TextField onChange={(e)=>{setFirstName(e.target.value)}} label='First Name' placeholder='Enter First Name' fullWidth/>
                    <TextField onChange={(e)=>{setLastName(e.target.value)}} label='Last Name' placeholder='Enter Last Name' fullWidth/>
                    <TextField onChange={(e)=>{setPassword(e.target.value)}} label='New Password' placeholder='Enter New Password' fullWidth/>
                    <Button onClick={updateProfile} type='submit' color='primary' variant="contained" style={btn} fullWidth>Update Profile</Button>
                    <Button onClick={deleteProfile} type='submit' color='error' variant="contained" style={btn} fullWidth>Delete Account</Button>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default EditProfile