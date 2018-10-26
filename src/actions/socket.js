import SocketIoClient from 'socket.io-client';
import * as types from '../constants/socket';
import redirect from './services';

export function lostSocketConnection() {
  return {
    type: types.SOCKET_CONNECTION_LOST,
  }
}

let socket = null;

export function socketConnect() {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({
      type: types.SOCKET_CONNECTION_REQUEST,
    });

    socket = SocketIoClient('ws://localhost:8000/', {
      query: { token }
    });

    socket.on('connect', ()=> {
      dispatch({
        type: types.SOCKET_CONNECTION_SUCCESS,
      });
    });

    socket.on('error', ()=> {
      dispatch({
        type: types.SOCKET_CONNECTION_FAILURE,
      });
    });

    socket.on('connect)error', ()=> {
      dispatch({
        type: types.SOCKET_CONNECTION_FAILURE,
      })
    });

    socket.on('new-message', ( message )=> {
      dispatch({
        type: types.RECEIVE_MESSAGE,
        payload: message,
      });
    });

    socket.on('new-chat', ({ chat })=> {
      dispatch({
        type: types.RECEIVE_NEW_CHAT,
        payload: chat,
      });
    });

    socket.on('deleted-chat', ({ chat })=> {
      const { activeId } = getState().chats;

      dispatch({
        type: types.RECEIVE_DELETED_CHAT,
        payload: chat,
      });

      if (activeId === chat._id)
        dispatch(redirect('/chat'));
    });
  }
}

export function sendMessage(content) {
  return (dispatch, getState) => {
    const { activeId } = getState().chats;

    if (!socket) {
      dispatch(lostSocketConnection());
    }

    socket.emit('send-message', {
      chatId: activeId,
      content,
    }, () => {
      dispatch({
        type: types.SEND_MESSAGE,
        payload: {
          chatId: activeId,
          content,
        }
      });
    });
  }
}

export function mountChat(chatId) {
  return (dispatch, getState) => {
    if (!socket) {
      dispatch(lostSocketConnection());
    }
    
    socket.emit('mount-chat', chatId);
    dispatch({
      type: types.MOUNT_CHAT,
      payload: { chatId },
    });
  }
}

export function unmountChat(chatId) {
  return (dispatch, getState) => {
    if (!socket) {
      dispatch(lostSocketConnection());
    }
    
    socket.emit('unmount-chat', chatId);
    dispatch({
      type: types.UNMOUNT_CHAT,
      payload: { chatId },
    })
  }
}
