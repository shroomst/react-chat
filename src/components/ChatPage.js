import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import SideBar from './SideBar';
import ApplicationBar from './ApplicationBar';
import Chat from './Chat';
import AddChat from './AddChat';
import UserInfo from './UserInfo';
import ErrorMessage from './ErrorMessage';

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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '30%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

class ChatPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    fetchAllChats: PropTypes.func.isRequired,
    fetchMyChats: PropTypes.func.isRequired,
    setActiveChat: PropTypes.func.isRequired,
    socketConnect: PropTypes.func.isRequired,
    mountChat: PropTypes.func.isRequired,
    unmountChat: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    logout: PropTypes.func.isRequired,
    chats: PropTypes.PropTypes.shape({
      active: PropTypes.object,
      my: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
        }),
      ),
      all: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
        }),
      ),
    }).isRequired,
    addChat: PropTypes.func.isRequired,
    saveUserInfo: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        chatId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        sender: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          username: PropTypes.string.isRequired,
          _id: PropTypes.string.isRequired,
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
      }),
    ).isRequired,
    activeUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
    sendMessage: PropTypes.func.isRequired,
    joinChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    deleteChat: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Error),
    isConnected: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    error: null,
  };

  state = {
    modalAddChatIsOpen: false,
    modalUserInfoIsOpen: false,
    selectedChatsFilter: 'my',
  };

  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeSelectedChatsFilter = this.changeSelectedChatsFilter.bind(this);
  }

  componentDidMount() {
    const {
      match,
      fetchAllChats,
      fetchMyChats,
      setActiveChat,
      socketConnect,
      mountChat,
    } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()])
      .then(() => {
        socketConnect();
      })
      .then(() => {
        const { chatId } = match.params;
        if (chatId) {
          setActiveChat(chatId);
          mountChat(chatId);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params },
      setActiveChat,
      mountChat,
      unmountChat,
    } = this.props;
    const { params: nextParams } = nextProps.match;
    if (nextParams.chatId && params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
      unmountChat(params.chatId);
      mountChat(nextParams.chatId);
    }
  }

  handleModal(modal) {
    const { modalAddChatIsOpen, modalUserInfoIsOpen } = this.state;
    switch (modal) {
      case 'chatModal':
        this.setState(prevState => ({
          ...prevState,
          modalUserInfoIsOpen: false,
          modalAddChatIsOpen: !modalAddChatIsOpen,
        }));
        break;
      case 'userInfoModal':
        this.setState(prevState => ({
          ...prevState,
          modalAddChatIsOpen: false,
          modalUserInfoIsOpen: !modalUserInfoIsOpen,
        }));
        break;
      default:
    }
  }

  changeSelectedChatsFilter(event, value) {
    this.setState(prevState => ({
      ...prevState,
      selectedChatsFilter: value === 'my' ? 'my' : 'all',
    }));
  }

  closeModal() {
    this.setState(prevState => ({
      ...prevState,
      modalUserInfoIsOpen: false,
      modalAddChatIsOpen: false,
    }));
  }

  render() {
    const {
      classes,
      logout,
      chats,
      addChat,
      saveUserInfo,
      messages,
      activeUser,
      sendMessage,
      joinChat,
      leaveChat,
      deleteChat,
      error,
      isConnected,
    } = this.props;
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
          isConnected={isConnected}
        />
        <Modal isOpen={modalAddChatIsOpen} style={modalStyles} onRequestClose={this.closeModal}>
          <AddChat onSubmit={addChat} closeModals={this.closeModal} disabled={!isConnected} />
        </Modal>
        <Modal isOpen={modalUserInfoIsOpen} style={modalStyles} onRequestClose={this.closeModal}>
          <UserInfo
            onSubmit={saveUserInfo}
            closeModals={this.closeModal}
            activeUser={activeUser}
            disabled={!isConnected}
          />
        </Modal>
        <SideBar
          chats={selectedChatsFilter === 'my' ? chats.my : chats.all}
          activeChat={chats.active}
          addChatHandler={this.handleModal}
          changeSelectedChatsFilter={this.changeSelectedChatsFilter}
          selectedChatsFilter={selectedChatsFilter}
          isConnected={isConnected}
        />
        <Chat
          messages={messages}
          sendMessage={sendMessage}
          joinChat={joinChat}
          activeChat={chats.active}
          activeUser={activeUser}
          isConnected={isConnected}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
