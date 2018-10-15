import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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


const ChatPage = ({ classes })=>  (
  <div className={classes.root}>
    <ApplicationBar/>
    <SideBar chats={chats}/>
    <Chat messages={messages}/>
  </div>
);

export default withStyles(styles)(ChatPage);
