import React from 'react';
import PropTypes from 'prop-types';

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

ChatList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        username: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }).isRequired,
      members: PropTypes.arrayOf(
        PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          username: PropTypes.string.isRequired,
          _id: PropTypes.string.isRequired,
        }),
      ).isRequired,
      title: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      _v: PropTypes.number,
    }),
  ),
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  disabled: PropTypes.bool.isRequired,
};

ChatList.defaultProps = {
  activeChat: null,
  chats: null,
};

export default withStyles(styles)(ChatList);
