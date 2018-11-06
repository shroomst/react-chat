import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
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
      <Typography variant="h6" color="inherit" noWrap>
        React Chat
      </Typography>
    </Toolbar>
  </AppBar>
);

WelcomeHeaderBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(WelcomeHeaderBar);
