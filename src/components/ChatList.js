import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import ChatListItem from './ChatListItem';

const styles = {
  chatList: {
    height: 'calc(100vh - 56px - 64px)',
    overflowY: 'auto',
  },
  noChats: {
    textAlign: 'center',
  },
};

const ChatList = ({
  classes, chats, activeChat, disabled,
}) => (
  <List className={classes.chatList}>
    {chats && chats.length ? (
      chats.map(chat => (
        <ChatListItem
          disabled={disabled}
          /* eslint-disable no-underscore-dangle */
          key={chat._id}
          active={activeChat && activeChat._id === chat._id}
          chatId={chat._id}
          /* eslint-enable no-underscore-dangle */
          {...chat}
        />
      ))
    ) : (
      <Typography variant="subtitle1" className={classes.noChats}>
        No chats yet...
      </Typography>
    )}
  </List>
);

export default withStyles(styles)(ChatList);
