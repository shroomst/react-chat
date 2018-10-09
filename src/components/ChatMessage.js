import React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from './Avatar';


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
  author : {
    color: "red"
  }
});

const ChatMessage =({classes, sender, content, index, when}) => {

  const isMessageFromMe = sender === "me";

  const userAvatar = (
    <Avatar colorFrom={sender}>{sender}</Avatar>
  );

  return (
      <div key ={index} className={classnames(
        classes.messageWrapper, 
        isMessageFromMe && classes.ownMessageWrapper
      )}>  
       {!isMessageFromMe && userAvatar}  
        <Paper className={classnames(
          classes.message,
          isMessageFromMe && classes.ownMessage
        )}>
          <Typography variant="body2"  className={classes.author}>
            {sender}
          </Typography>
          <Typography variant="body1" >
            {content}
          </Typography>
          <Typography variant="caption" >
            {when}
          </Typography>
        </Paper>
        {isMessageFromMe && userAvatar}    
      </div>
  );
}

export default withStyles(styles)(ChatMessage);
