import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';

const styles = theme => ({
  chatList: {
    height: 'calc(100vh - 56px - 64px)',
    overflowY: 'auto', 
  }
});



const ChatList = ({ classes, chats }) => (
  <List className={classes.chatList}>
    {chats.map((chat, index, updatedAt) => (
      <ChatListItem key={index} {...chat} updated={updatedAt}/>
      ))}
  </List>
);

export default withStyles (styles) (ChatList);
