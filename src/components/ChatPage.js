import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SideBar from './SideBar';
import ApplicationBar from './ApplicationBar';
import Chat from './Chat';
import AddChatModal from './AddChatModal';

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
  state = {
    modalAddChatIsOpen: false,
    selectedChatsFilter: 'my',
  }

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.handleAddChatModal = this.handleAddChatModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeSelectedChatsFilter = this.changeSelectedChatsFilter.bind(this);
  }

  handleAddChatModal() {
    this.setState({modalAddChatIsOpen: !this.state.modalAddChatIsOpen});
  }

  openModal() {
    this.setState({modalAddChatIsOpen: true});
  }

  changeSelectedChatsFilter(event,value) {
    switch (value) {
      case 'my': 
        this.setState({selectedChatsFilter: 'my'});
        return;
      case 'all': 
        this.setState({selectedChatsFilter: 'all'});
        return;
      default: 
        this.setState({selectedChatsFilter: 'my'});
    }
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
    // можно передать пропсы в модал
  }

  closeModal() {
    //const { fetchAllChats, fetchMyChats } = this.props;
    this.setState({modalAddChatIsOpen: false});
    // Promise.all([
    //   fetchAllChats(),
    //   fetchMyChats(),
    // ]);
  }

  componentDidMount() {
    const { fetchAllChats, fetchMyChats } = this.props;
    Promise.all([
      fetchAllChats(),
      fetchMyChats(),
    ]);
  }

  render() {
    const { classes, logout, user, myChats, chats, addChat } = this.props;
    const { selectedChatsFilter } = this.state;
    const selectedChats = (selectedChatsFilter === 'my') ? myChats : chats;

    return (
      <div className={classes.root}>
        <ApplicationBar logout={logout} user={user}/>
        <SideBar 
          chats={selectedChats}
          addChatHandler={this.handleAddChatModal}
          changeSelectedChatsFilter={this.changeSelectedChatsFilter}
          selectedChatsFilter={selectedChatsFilter}
        />
        <AddChatModal 
          isOpen={this.state.modalAddChatIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Add Chat"
          onSubmit={addChat}
        />
        <Chat messages={messages}/>
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
