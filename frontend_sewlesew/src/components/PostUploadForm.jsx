import React, { useState } from 'react'
import { Grid,Paper, TextField, 
  Button, Stack, Typography, Box, LinearProgress } from'@mui/material'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { MultipleOptions, ImageUpload, Dropzone, DropzoneVideo } from './';
import { useDynamic } from '../contexts/DynamicContext';
import { postProductToAPI } from '../utils/postProductToAPI';
import { toast } from 'react-toastify';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import axios from 'axios';

const PostUploadForm = () => {
  const {
    sessionToken,
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
    documentNewPost,
    files,
    videoFiles
} = useDynamic();

const [sendImages, setSendImages] = useState([])
const [sendVideo, setSendVideo] = useState([])
const [imageUploadProgress, setImageUploadProgress] = useState(0)
const [videoUploadProgress, setVideoUploadProgress] = useState(0)

  const storeToCloudinary = async () => {
    const preset_key = "sewlesew";
    const cloud_name = "dobpc3vmd";

    if (files) {
      const formData = new FormData()
      // Upload images
      for (let file in files) {
        formData.append('file', files[file])
        formData.append('upload_preset', preset_key);
        
        await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData, {
          withCredentials: false,
          onUploadProgress: (data) => {
            setImageUploadProgress(Math.round((data.loaded/data.total) * 100))
          }
        })
        .then(res => {
          setSendImages(sendImages.push(res.data.secure_url))
        }
          )
        .catch( err => console.log(err));
      }

      // Upload video
      const formDataVideo = new FormData()
      for (let videoFile in videoFiles) {
        formDataVideo.append('file', videoFiles[videoFile])
        formDataVideo.append('upload_preset', preset_key);

        await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`, formDataVideo, {
          withCredentials: false,
          onUploadProgress: (data) => {
            setVideoUploadProgress(Math.round((data.loaded/data.total) * 100))
          }
        })
        .then(res => {
          setSendVideo(sendVideo.push(res.data.secure_url))
        }
          )
        .catch( err => console.log(err));
      }
    }
  }

  const uploadForm = async(e) => {
    await storeToCloudinary()
    const url = 'http://localhost:5000/api/v1/posts';
    const headers = {"session_id": sessionToken};
    // Upload Images to cloudinary
    e.preventDefault()

    const data = {
      title: titleNewPost,
      description: descriptionNewPost,
      amount: amountNewPost,
      totalRaised: 0,
      location: locationNewPost,
      category: categoryNewPost,
      pictureFile: sendImages,
      // videoFile: videoNewPost,
      videoFile: sendVideo,
      documentFile: documentNewPost
    }

    return (await postProductToAPI(url, data, headers)
    .then((response) => {

      toast.success("Post successful")

    })
    .catch((error) => {
        toast.error(String(error));
    }))
  }

  const paperStyle={padding :20, height:"auto", width:600, margin:"20px auto"}
  const btn={margin:'8px 0'}
  const options = ['dialysis', 'heart', 'cancer', 'accident', 'housing', 'elderly', 'orphan', 'other']
  return (
    <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Stack gap='20px'>
                <Grid  align='center'>
                    {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
                    {/* <h2>Create Post</h2> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      <span class="color logo" >Create Post</span>
                    </Typography>
                </Grid>
                <TextField onChange={(e)=>{setTitleNewPost(e.target.value)}} label='Title' placeholder='Enter title' fullWidth required/>
                <TextField onChange={(e)=>{setDescriptionNewPost(e.target.value)}} multiline label='Description' placeholder='Enter description' fullWidth required/>
                <TextField type="number" onChange={(e)=>{setAmountNewPost(e.target.value)}} label='Amount Required' placeholder='Enter required amount' fullWidth required/>
                <TextField onChange={(e)=>{setLocationNewPost(e.target.value)}} label='Location' placeholder='location' fullWidth/>
                <MultipleOptions onChange={(e)=>{setCategoryNewPost(e.target.value)}} category="Category" options={options}/>
                <Grid  alignItems="center" justifyContent="center">
                  <Stack direction="column" spacing={4}>
                    <section>
                      <div>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                          <span class="color logo" >Upload Images</span>
                        </Typography>
                        <Dropzone/>
                        {imageUploadProgress!==0 && <Box sx={{ width: '50%', marginTop: '35px', marginBottom: '20px', marginRight: 'auto', marginLeft: 'auto'}}>
                          <LinearProgress sx={{ borderRadius:'5px', height: '3px'}} variant='determinate' value={imageUploadProgress} color='secondary' />
                        </Box>}
                      </div>
                    </section>

                    <section>
                      <div>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                          <span class="color logo" >Upload Video</span>
                        </Typography>
                        <DropzoneVideo/>
                        {/* {console.log(videoUploadProgress)} */}
                        {videoUploadProgress!==0 && <Box sx={{ width: '50%',  marginTop: '35px', marginBottom: '20px', marginRight: 'auto', marginLeft: 'auto'}}>
                          <LinearProgress sx={{ borderRadius:'5px', height: '3px'}} variant='determinate' value={videoUploadProgress} color='secondary' />
                        </Box>}
                      </div>
                    </section>

                  </Stack>
                </Grid>
                <Button onClick={uploadForm} type='submit' color='primary' variant="contained" style={btn} fullWidth>Post</Button>
            </Stack>
        </Paper>
    </Grid>
)
}

export default PostUploadForm