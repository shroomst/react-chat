import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  statusMessage: {
    width: '100%',
    textAlign: 'center',
  },
  messageWrapper: {
    display: 'flex',
    padding: theme.spacing.unit * 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const ChatEvent = ({
  classes, senderName, color, senderCreatedAt, content,
}) => (
  <div className={classes.messageWrapper}>
    <div className={classes.statusMessage}>
      <Typography variant="subtitle1" style={{ display: 'inline', color }}>
        {senderName}
      </Typography>
      {content}
      <Typography variant="caption">{<Moment fromNow>{senderCreatedAt}</Moment>}</Typography>
    </div>
  </div>
);

ChatEvent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  senderName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  senderCreatedAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChatEvent);
