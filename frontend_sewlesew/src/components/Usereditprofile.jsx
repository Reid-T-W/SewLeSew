import { Typography, Link, Grid, Button } from '@mui/material'
import { Userprofileoptions, EditProfile } from '.'

const Usereditprofile = () => {
  return (
    <>
      <Grid mt='50px' align='center'>
        <Userprofileoptions />
        <Typography mt='20px'> Update Profile </Typography>
      </Grid>
      <Grid mt="30px">
          <EditProfile />
      </Grid>
    </>
  )
}

export default Usereditprofile