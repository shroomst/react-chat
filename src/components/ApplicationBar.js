import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import UserMenu from './UserMenu';
import ChatMenu from './ChatMenu';
import Avatar from './Avatar';

const drawerWidth = 320;

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.secondary.contrastText,
    width: '70%'
  },
});

const ApplicationBar = ({ classes , logout, activeUser, userInfoHandler, leaveChat, deleteChat, activeChat })=>  (
  <AppBar className={classes.appBar}>
    <Toolbar>
      { !!activeChat 
        ? (
          <React.Fragment> 
            <Avatar colorFrom={activeChat._id}>
              {activeChat.title}
            </Avatar>
            <Typography variant="h5" color="inherit" noWrap className={classes.title}>
            {activeChat.title}
              <ChatMenu
                activeUser={activeUser}
                onLeaveClick={() => leaveChat(activeChat._id)}
                onDeleteClick={() => deleteChat(activeChat._id)}
              />
            </Typography>
          </React.Fragment>
        )
        : (
          <Typography variant="h5" color="inherit" noWrap className={classes.title}>
            Chat on React
          </Typography>
        )
      }
      <UserMenu 
        onLogout={logout} 
        username={!!activeUser ? activeUser.username : ''}
        userInfoHandler={userInfoHandler}
      />
    </Toolbar>
  </AppBar>
);

 export default withStyles (styles)(ApplicationBar);
