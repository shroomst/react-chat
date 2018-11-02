import React from 'react';
import classnames from 'classnames';
import Moment from 'react-moment';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Avatar from './Avatar';
import ChatEvent from './ChatEvent';
import getSenderName from '../utils/sender-name';
import getColor from '../utils/color-from';

const styles = theme => ({
  ownMessage: {
    marginRight: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff',
  },
  message: {
    maxWidth: '70%',
    minWidth: '10%',
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
  messageWrapper: {
    display: 'flex',
    padding: theme.spacing.unit * 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ownMessageWrapper: {
    justifyContent: 'flex-end',
  },
});


const ChatMessage = ({
  classes, sender, content, activeUser, createdAt, statusMessage,
}) => {
  /* eslint-disable no-underscore-dangle */
  const isMessageFromMe = sender._id === activeUser._id;
  /* eslint-enable no-underscore-dangle */
  const senderName = getSenderName(sender);

  if (statusMessage) {
    return (
      <ChatEvent
        senderName={senderName}
        /* eslint-disable no-underscore-dangle */
        color={getColor(sender._id)}
        /* eslint-enable no-underscore-dangle */
        senderCreatedAt={createdAt}
        content={content}
      />
    );
  }

  const userAvatar = (
    /* eslint-disable no-underscore-dangle */
    <Avatar colorFrom={sender._id}>
      {/* eslint-disable no-underscore-dangle */}
      {senderName}
    </Avatar>
  );

  return (
    /* eslint-disable max-len */
    <div className={classnames(classes.messageWrapper, isMessageFromMe && classes.ownMessageWrapper)}>
      {!isMessageFromMe && userAvatar}
      <Paper className={classnames(classes.message, isMessageFromMe && classes.ownMessage)}>
        <Typography
          variant="body2"
          className={classes.author}
          style={{ color: getColor(sender._id) }}
        >
          {senderName}
        </Typography>
        <Typography variant="body1">
          {content}
        </Typography>
        <Typography variant="caption" style={{ color: 'grey' }}>
          <Moment fromNow>{createdAt}</Moment>
        </Typography>
      </Paper>
      {isMessageFromMe && userAvatar}
    </div>
  );
};

export default withStyles(styles)(ChatMessage);
