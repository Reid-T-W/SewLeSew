import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Doner } from '.';
import { Box, ListItemButton } from '@mui/material';
import { FixedSizeList } from 'react-window';

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        {/* <ListItemText primary={`Item ${index + 1}`} /> */}
        <Doner />
        <Divider variant="inset" component="li" />
      </ListItemButton>
    </ListItem>
  );
}

const DonersList = () => {
  return (
    <Box
      sx={{ 
        width: '100%',
        height: 400,
        maxWidth: 360,
        bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={430}
        width={360}
        itemSize={150}
        itemCount={20}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
export default DonersList