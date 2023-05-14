import React from 'react'
import { Grid,Paper, TextField, 
  Button, Stack } from'@mui/material'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { MultipleOptions, ImageUpload } from './';
import { useDynamic } from '../contexts/DynamicContext';
import { postProductToAPI } from '../utils/postProductToAPI';
import { toast } from 'react-toastify';

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
    documentNewPost
} = useDynamic();

  const uploadForm = async() => {
    const url = 'http://localhost:5000/api/v1/posts';
    const headers = {"session_id": sessionToken};
    const data = {
      title: titleNewPost,
      description: descriptionNewPost,
      amount: amountNewPost,
      totalRaised: -1,
      location: locationNewPost,
      category: categoryNewPost,
      pictureFile: imageNewPost,
      videoFile: videoNewPost,
      documentFile: documentNewPost
    }

    return (await postProductToAPI(url, data, headers)
    .then((response) => {

      toast.success(response.data)

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
                    <h2>Create Post</h2>
                </Grid>
                <TextField onChange={(e)=>{setTitleNewPost(e.target.value)}} label='Title' placeholder='Enter title' fullWidth required/>
                <TextField onChange={(e)=>{setDescriptionNewPost(e.target.value)}} multiline label='Description' placeholder='Enter description' fullWidth required/>
                <TextField type="number" onChange={(e)=>{setAmountNewPost(e.target.value)}} label='Amount Required' placeholder='Enter required amount' fullWidth required/>
                <TextField onChange={(e)=>{setLocationNewPost(e.target.value)}} label='Location' placeholder='location' fullWidth/>
                <MultipleOptions onChange={(e)=>{setCategoryNewPost(e.target.value)}} category="Category" options={options}/>
                <Grid  alignItems="center" justifyContent="center">
                  <Stack direction="column" spacing={4}>
                    <ImageUpload message="Upload an image ..."/>
                    <ImageUpload message="Upload a video ..."/>
                    <ImageUpload message="Upload a document ..."/>
                  </Stack>
                </Grid>
                <Button onClick={uploadForm} type='submit' color='primary' variant="contained" style={btn} fullWidth>Post</Button>
                <a className="developed_by" href="https://upload.io/uploader" target="_blank">
                  Powered by Upload.io
                </a>
            </Stack>
        </Paper>
    </Grid>
)
}

export default PostUploadForm