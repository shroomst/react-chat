import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from './Avatar'

const ChatListItem = ({index, title}) => (
  <ListItem key={index} button>
    <Avatar colorFrom={title} >{title}</Avatar>
    <ListItemText primary={title} secondary="1 year ago"/>
  </ListItem>
);

export default ChatListItem;
