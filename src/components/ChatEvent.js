import React from 'react';
import Moment from 'react-moment';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  statusMessage: {
    width: '100%',
    textAlign: 'center'
  },
  messageWrapper : {
    display: 'flex',
    padding: theme.spacing.unit * 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const ChatEvent = ({ classes, senderName, color, senderCreatedAt, content }) => (
  <div className={classes.messageWrapper}>
    <div className={classes.statusMessage}>
      <Typography 
        variant="h6" 
        style={{ display: 'inline', color: color }}
      >
        {senderName}
      </Typography> 
        { content }
      <Typography variant="caption" /*component="span"*/>
        {<Moment fromNow>{senderCreatedAt}</Moment>}
      </Typography>
    </div>
  </div>  
);

export default withStyles(styles)(ChatEvent);
