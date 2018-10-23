import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';

import SideBar from './SideBar';
import ApplicationBar from './ApplicationBar';
import Chat from './Chat';
import AddChat from './AddChat';
import UserInfo from './UserInfo';

const styles = theme => ({
  chatPage: {
    position: 'relative',
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content : {
    top         : '50%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    width       :  '30%',
    transform   : 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('#root');

class ChatPage extends React.Component {
  state = {
    modalAddChatIsOpen: false,
    modalUserInfoIsOpen: false,
    selectedChatsFilter: 'my',
  }

  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeSelectedChatsFilter = this.changeSelectedChatsFilter.bind(this);
  }

  handleModal(modal) {
    switch (modal) {
      case "chatModal":
        this.setState((prevState)=> ({ 
          ...prevState,
          modalUserInfoIsOpen: false,
          modalAddChatIsOpen: !this.state.modalAddChatIsOpen,
        }));
        break;
      case "userInfoModal":
        this.setState((prevState)=> ({ 
          ...prevState,
          modalAddChatIsOpen: false,
          modalUserInfoIsOpen: !this.state.modalUserInfoIsOpen,
        }));
        break;
      default:
      }
  }

  changeSelectedChatsFilter(event, value) {
    this.setState((prevState)=> ({ 
      ...prevState,
      selectedChatsFilter: (value === 'my') ? 'my' : 'all'
    }));
  }


  closeModal() {
    this.setState((prevState)=> ({ 
      ...prevState,
      modalUserInfoIsOpen: false,
      modalAddChatIsOpen: false 
    }));
  }

  componentDidMount() {
    const { match, fetchAllChats, fetchMyChats, setActiveChat } = this.props;
    
    Promise.all([
      fetchAllChats(),
      fetchMyChats(),
    ])
      .then(() => {
        // If we pass a chatId, then fetch messages from chat
        if (match.params.chatId) {
          setActiveChat(match.params.chatId);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    
    const { match: { params }, setActiveChat } = this.props;
    const { params: nextParams } = nextProps.match;
    // If we change route, then fetch messages from chat by chatID
    if (nextParams.chatId && params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
    }
  }

  render() {
    const { classes, 
            logout, 
            chats, 
            addChat, 
            saveUserInfo, 
            messages, 
            activeUser, 
            sendMessage, 
            joinChat, 
            leaveChat, 
            deleteChat } = this.props;
    const { modalAddChatIsOpen, modalUserInfoIsOpen } = this.state;
    const { selectedChatsFilter } = this.state;

    return (
      <div className={classes.chatPage}>
        <ApplicationBar 
          logout={logout} 
          activeUser={activeUser}
          activeChat={chats.active}
          leaveChat={leaveChat}
          deleteChat={deleteChat}
          userInfoHandler={this.handleModal}
        />
        <Modal
          isOpen={modalAddChatIsOpen} 
          style={modalStyles}
          onRequestClose={this.closeModal}
        >
          <AddChat 
            onSubmit={addChat} 
            closeModals={this.closeModal}
          />
        </Modal>
        <Modal
          isOpen={modalUserInfoIsOpen} 
          style={modalStyles}
          onRequestClose={this.closeModal}
        >
          <UserInfo 
            onSubmit={saveUserInfo} 
            closeModals={this.closeModal}
            username={(!!activeUser) ? activeUser.username: ''}
            firstName={(!!activeUser) ? activeUser.firstName: ''}
            lastName={(!!activeUser) ? activeUser.lastName: ''}
          />
        </Modal>
        <SideBar 
          chats={(selectedChatsFilter === 'my') ? chats.my : chats.all}
          addChatHandler={this.handleModal}
          changeSelectedChatsFilter={this.changeSelectedChatsFilter}
          selectedChatsFilter={selectedChatsFilter}
        />
        <Chat 
          messages={messages} 
          sendMessage={sendMessage}
          joinChat={joinChat}
          activeChat={chats.active}
          activeUser={activeUser}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
