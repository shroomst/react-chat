import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChatList from './ChatList'
import BottomNav from './BottomNav'
import AddChat from './AddChat'
import SearchChat from './SearchChat'

const drawerWidth = 320;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
});

const SideBar = ({ classes, chats }) => (
  <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
  >
    <SearchChat/>
    <Divider/>
    <ChatList chats = {chats}/>
    <BottomNav/>
    <AddChat/>  
  </Drawer>
);

export default withStyles (styles)(SideBar);
