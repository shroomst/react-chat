import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import SideBar from './SideBar'
import ApplicationBar from './ApplicationBar'
import Chat from './Chat'

import {chats, messages} from '../mock-data'

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
});


class ChatPage extends React.Component {
  render() {
    const { classes, logout, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return (
        <Redirect to="/"/>
      );
    }

    return (
      <div className={classes.root}>
        <ApplicationBar logout={logout}/>
        <SideBar chats={chats}/>
        <Chat messages={messages}/>
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
