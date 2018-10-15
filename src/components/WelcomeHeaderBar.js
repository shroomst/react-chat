import React from 'react';

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import ChatIcon from '@material-ui/icons/Chat';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: '100%',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
});

const WelcomeHeaderBar = ({ classes }) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      <Avatar className={classes.avatar}>
        <ChatIcon />
      </Avatar>
      <Typography variant="title" color="inherit" noWrap>
        React Chat
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles (styles)(WelcomeHeaderBar);
