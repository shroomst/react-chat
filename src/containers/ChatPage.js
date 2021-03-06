import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as fromChats from '../reducers/chats'; // SELECTORS
import * as fromState from '../reducers';       // SELECTORS

import { fetchAllChats, fetchMyChats, setActiveChat, addChat, deleteChat, joinChat, leaveChat } from '../actions/chats';
import { saveUserInfo } from '../actions/users';
import { sendMessage, mountChat, unmountChat, socketConnect } from '../actions/socket';
import { logout } from '../actions/auth';
import ChatPage from '../components/ChatPage';

const mapStateToProps = state => {
  const activeChat = fromChats.getById(state.chats, state.chats.activeId);
  return {
    isAuthenticated: state.auth.isAuthenticated,
    chats: {
      all: fromChats.getByIds(state.chats, state.chats.allIds),
      my: fromChats.getByIds(state.chats, state.chats.myIds),
      active: activeChat
    },
    activeUser: {
      ...state.auth.user,
      isMember: fromState.isMember(state, activeChat),
      isCreator: fromState.isCreator(state, activeChat),
      isChatMember: fromState.isChatMember(state, activeChat)
    },
    messages: state.messages,
    error: state.services.errors.chat,
    isConnected: state.services.isConnected,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators ({
  logout,
  addChat,
  deleteChat,
  joinChat,
  leaveChat,
  saveUserInfo,
  fetchAllChats,
  fetchMyChats,
  setActiveChat,
  sendMessage,
  mountChat,
  unmountChat,
  socketConnect
}, dispatch);

export default connect (
  mapStateToProps,
  mapDispatchToProps
) (ChatPage);
