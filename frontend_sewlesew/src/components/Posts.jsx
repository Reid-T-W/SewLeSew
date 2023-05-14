import { Stack, Box } from "@mui/material";
import { Postcard } from "./";
import { useNavigate } from 'react-router-dom';
import { useDynamic } from '../contexts/DynamicContext';

// const Posts = ({ posts }) => {
  const Posts = () => {
    const {
      posts
  } = useDynamic();
  // console.log(posts);
  const navigate = useNavigate();
  // const handleClick = (id) => navigate(`/posts/${id}`);
  return (
    <Stack direction="row" flexWrap="wrap"
    justifyContent="center" gap={2}>
      {posts.map((post) => (
        <Box key={post.id}>
          {post.id && <Postcard id={post.id} post={post}/>}
        </Box>
      ))}

    </Stack>
  )
}

export default Posts