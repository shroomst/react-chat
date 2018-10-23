import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChatList from './ChatList'
import BottomNav from './BottomNav'
import AddChatButton from './AddChatButton'
import SearchChat from './SearchChat'

const drawerWidth = 320;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
});

class SideBar extends React.Component {
  state = {
    searchValue: ''
  }

  constructor(props) {
    super(props);
    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(value) {
    this.setState({
      searchValue: value
    })
  }

  searchChatList(chats, searchValue) {
    return chats
      .filter(chat => chat.title
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      .sort((one, two) =>
          one.title.toLowerCase() <= two.title.toLowerCase() ? -1 : 1
      );
  }

  render() {
    const { classes, chats, addChatHandler, changeSelectedChatsFilter, selectedChatsFilter, activeChat } = this.props;
    const { searchValue } = this.state;
  
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <SearchChat searchHandler={this.searchHandler}/>
        <Divider/>
        <ChatList 
          chats={this.searchChatList(chats, searchValue)}
          activeChat={activeChat}
        />
        <BottomNav 
          handleChange={changeSelectedChatsFilter} 
          selectedChatsFilter={selectedChatsFilter}
        />
        <AddChatButton addHandler={addChatHandler}/> 
      </Drawer>
    );
  }
}

export default withStyles (styles)(SideBar);
