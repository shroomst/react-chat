import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SideBar from './SideBar'
import ApplicationBar from './ApplicationBar'
import Chat from './Chat'

import { messages} from '../mock-data'

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
componentDidMount() {
  const { fetchAllChats, fetchMyChats } = this.props;
  Promise.all([
    fetchAllChats(),
    fetchMyChats(),
  ]);
}

  render() {
    const { classes, logout, user, chats } = this.props;

    return (
      <div className={classes.root}>
        <ApplicationBar logout={logout} user={user}/>
        <SideBar chats={chats}/>
        <Chat messages={messages}/>
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
