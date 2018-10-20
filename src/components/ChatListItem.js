import React from 'react';
import Moment from 'react-moment';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from './Avatar'

const ChatListItem = ({index, title, updatedAt}) => (
  <ListItem key={index} button>
    <Avatar colorFrom={title} >{title}</Avatar>
    <ListItemText primary={title} secondary={<Moment fromNow>{updatedAt}</Moment>}/>
  </ListItem>
);

export default ChatListItem;
