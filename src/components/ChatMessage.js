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
  ownMessage : {
    marginRight: theme.spacing.unit * 2,
    backgroundColor: "#e6dcff",
  },
  message : {
    maxWidth: "70%",
    minWidth: "10%",
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
  messageWrapper : {
    display: 'flex',
    padding: theme.spacing.unit * 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ownMessageWrapper : {
    justifyContent: 'flex-end',
  },
});


const ChatMessage = ({classes, sender, content, activeUser, createdAt, statusMessage}) => {
  const isMessageFromMe = sender._id === activeUser._id;
  const senderName = getSenderName(sender);

  if (statusMessage) {
    return (
      <ChatEvent 
        senderName={senderName}
        color={getColor(sender._id)}
        senderCreatedAt={createdAt}
        content={content}
      />
    );
  }
  
  const userAvatar = (
    <Avatar colorFrom={sender._id}>
      {sender}
    </Avatar>
  );

  return (
    <div className={classnames(classes.messageWrapper, isMessageFromMe && classes.ownMessageWrapper)}>  
      {!isMessageFromMe && userAvatar}  
      <Paper className={classnames(classes.message, isMessageFromMe && classes.ownMessage)}>
        <Typography variant="body1" className={classes.author}>
          {sender}
        </Typography>
        <Typography variant="body2">
          {content}
        </Typography>
        <Typography variant="caption">
          <Moment fromNow>{createdAt}</Moment>
        </Typography>
      </Paper>
      {isMessageFromMe && userAvatar}    
    </div>
  );
}

export default withStyles(styles)(ChatMessage);
