import { Link, NavLink } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import { useDynamic } from '../contexts/DynamicContext';

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle,
demoChannelUrl, demoChannelTitle } from '../utils/constants';

const Postcard = ({id, post}) => {
  // Importing states
  const {
    posts
  } = useDynamic();

  const donationProgress = () => {
    const value = (post.totalRaised / post.amount) * 100;
    return value;
  }

  return (
    <Card sx={{ width: { sm:'358px', md: '320px', xs: '100%' },
    boxShadow: 'none', borderRadius: 0}}>
        <Link to={`/posts/${id}`}>
          {/* {console.log(post['Pictures'][0]['pictureFile']?post['Pictures'][0]['pictureFile']:'')} */}
            <CardMedia 
                image={post['Pictures'][0]? post['Pictures'][0]['pictureFile']:""}
                alt={post.title}
                sx={{ width: 358, height: 180 }}
            />
            <CardContent sx= {{ backgroundColor: '#ECE8E8',
            height: '106px' }}>
                <Link to='/'>
                <Typography variant="subtitle1"
                fontweight="bold" color="#3E6D9C">
                    {post.title.slice(0, 60)}
                </Typography>
                {/* <Typography variant="subtitle1"
                fontweight="bold" color="#3E6D9C">
                    {post.totalRaised}
                    <br/>
                    {post.amount}
                    <br/>
                    {donationProgress()}
                </Typography> */}
                </Link>
            </CardContent>
        </Link>
        <Box mb='0px'>
          <LinearProgress variant='determinate' value={donationProgress()} color='success' />
        </Box>
    </Card>
  )
}

export default Postcard
