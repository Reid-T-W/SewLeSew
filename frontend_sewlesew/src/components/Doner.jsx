import { Avatar, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDynamic } from '../contexts/DynamicContext'
import { currencyFormat } from '../utils/currencyFormatter'
import { dateTime } from '../utils/dateTimeFormatter'

const Doner = ({doner}) => {
  return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
           */}
           <Avatar>{doner.User.username.slice(0, 2).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary=<Typography>{currencyFormat(doner.amount)}</Typography>
          secondary={
            <React.Fragment>
              <Stack>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {`${doner.User.firstName} ${doner.User.lastName}`}
                </Typography>
                <Typography variant='string'>
                  {dateTime(doner.createdAt)}
                </Typography>
                
              </Stack>
            </React.Fragment>
          }
        />
      </ListItem>
  )
}

export default Doner