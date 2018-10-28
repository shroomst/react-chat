import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import Avatar from './Avatar'

const styles = theme => ({
  activeChat: {
    backgroundColor: theme.palette.grey[200],
  }
});

const ChatListItem = ({ classes, index, title, updatedAt, chatId, active, disabled }) => (
  <ListItem 
    key={index} 
    button
    component={Link}
    to={`/chat/${chatId}`}
    className={active ? classes.activeChat : ''}
    disabled={disabled}
  >
    <Avatar colorFrom={chatId} >{title}</Avatar>
    <ListItemText primary={title} secondary={<Moment fromNow>{updatedAt}</Moment>}/>
  </ListItem>
);

export default withStyles(styles)(ChatListItem);
