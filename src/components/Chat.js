import React from 'react';
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
  classes, messages, activeChat, activeUser, joinChat, sendMessage, isConnected,
}) => (
  <main className={classes.chatLayout}>
    <ChatMessagesList
      messages={messages}
      activeUser={activeUser}
    />
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

export default withRouter(withStyles(styles)(Chat));
