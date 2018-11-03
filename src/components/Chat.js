import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import InputMessage from './InputMessage';
import ChatMessagesList from './ChatMessagesList';

const styles = {
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 64,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
};

const Chat = ({
  classes,
  messages,
  activeChat,
  activeUser,
  joinChat,
  sendMessage,
  isConnected,
}) => (
  <main className={classes.chatLayout}>
    <ChatMessagesList messages={messages} activeUser={activeUser} />
    {activeChat && (
      <InputMessage
        sendMessage={sendMessage}
        showJoinButton={!activeUser.isChatMember}
        /* eslint-disable no-underscore-dangle */
        onJoinButtonClick={() => joinChat(activeChat._id)}
        /* eslint-enable no-underscore-dangle */
        activeUser={activeUser}
        disabled={!isConnected}
      />
    )}
  </main>
);

Chat.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    chatId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    sender: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  activeUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
  joinChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

Chat.defaultProps = {
  activeChat: null,
};

export default withRouter(withStyles(styles)(Chat));
