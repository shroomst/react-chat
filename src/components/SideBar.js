import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import ChatList from './ChatList';
import BottomNav from './BottomNav';
import AddChatButton from './AddChatButton';
import SearchChat from './SearchChat';

const drawerWidth = 320;

const styles = {
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
};

class SideBar extends React.Component {
  state = {
    searchValue: '',
  };

  constructor(props) {
    super(props);
    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(value) {
    this.setState({
      searchValue: value,
    });
  }

  searchChatList(searchValue) {
    const { chats } = this.props;
    return chats
      .filter(chat => chat.title.toLowerCase().includes(searchValue.toLowerCase()))
      .sort((one, two) => (one.title.toLowerCase() <= two.title.toLowerCase() ? -1 : 1));
  }

  render() {
    const {
      /* eslint-disable max-len */
      classes,
      addChatHandler,
      changeSelectedChatsFilter,
      selectedChatsFilter,
      activeChat,
      isConnected,
      /* eslint-enable max-len */
    } = this.props;
    const { searchValue } = this.state;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <SearchChat searchHandler={this.searchHandler} />
        <Divider />
        <ChatList
          disabled={!isConnected}
          chats={this.searchChatList(searchValue)}
          activeChat={activeChat}
        />
        <BottomNav
          handleChange={changeSelectedChatsFilter}
          selectedChatsFilter={selectedChatsFilter}
        />
        <AddChatButton disabled={!isConnected} addHandler={addChatHandler} />
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideBar);
