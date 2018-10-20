import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as fromChats from '../reducers/chats';
import { fetchAllChats, fetchMyChats, setActiveChat } from '../actions/chats'
import { logout } from '../actions';
import ChatPage from '../components/ChatPage';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  logoutMessage: state.auth.logoutMessage,
  chats: fromChats.getByIds(state.chats, state.chats.allIds),
});

const mapDispatchToProps = dispatch => bindActionCreators ({
  logout,
  fetchAllChats,
  fetchMyChats,
  setActiveChat
}, dispatch);

export default connect (
  mapStateToProps,
  mapDispatchToProps
) (ChatPage);
