import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Box, Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { currencyFormat } from '../utils/currencyFormatter';
import { donationProgress } from '../utils/donationProgressCalc';

const Postcard = ({id, post}) => {
  // Importing states
  return (
      <Card sx={{ width: { sm:'358px', md: '320px', xs: '100%' },
      boxShadow: 'none', borderRadius: '20px', backgroundColor: 'white',
      }} variant="outlined" raised="true">
          <Link class='no-underline' to={`/posts/${id}`}>
              <CardMedia 
                  image={post['Pictures'][0]? post['Pictures'][0]['pictureFile']:""}
                  alt={post.title}
                  sx={{ width: 358, height: 180 }}
              />
              <CardContent sx= {{ backgroundColor: 'white',
              height: '50px'}}>
                  <Stack justifyContent='center' alignItems='center'>
                    <Typography variant="subtitle1" justifyContent={'center'}
                    fontweight="bold" color="gray">
                        {post.title.slice(0, 60)}
                    </Typography>
                  </Stack>
              </CardContent>
            </Link>
          <Stack spacing="10px" justifyContent='center' alignItems='center'>
            <Typography variant="subtitle1"
            fontweight="bold" color="gray">
                {post.User.firstName} {post.User.lastName}
            </Typography>
            <Typography variant="subtitle1"
            fontweight="bold" color="#9c27b0">
                {currencyFormat(post.totalRaised)} / {currencyFormat(post.amount)}
            </Typography>
          </Stack> 
          <Box sx={{ width: '80%', marginBottom: '20px', marginRight: 'auto', marginLeft: 'auto'}}>
            <LinearProgress sx={{ borderRadius:'5px'}} variant='determinate' value={donationProgress(post.totalRaised, post.amount)} color='secondary' />
          </Box>
      </Card>
  )
}

export default Postcard
