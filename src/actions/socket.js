import SocketIoClient from 'socket.io-client';
import * as types from '../constants/socket';
import redirect from './services';

export function lostSocketConnection() {
  return {
    type: types.SOCKET_CONNECTION_LOST,
    payload: new Error('Connection lost. Trying to connect...'),
  };
}

let socket = null;

export function socketConnect() {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.socket) {
      return Promise.resolve();
    }

    dispatch({
      type: types.SOCKET_CONNECTION_REQUEST,
    });

    socket = SocketIoClient('ws://localhost:8000/', {
      query: { token },
    });

    socket.on('connect', () => {
      dispatch({
        type: types.SOCKET_CONNECTION_SUCCESS,
      });
    });

    socket.on('error', (error) => {
      dispatch({
        type: types.SOCKET_CONNECTION_FAILURE,
        payload: new Error(`Connection error: ${error}`),
      });
    });

    socket.on('connect_error', () => {
      dispatch({
        type: types.SOCKET_CONNECTION_FAILURE,
        payload: new Error('Connection lost :`( Connecting...'),
      });
    });

    socket.on('new-message', (message) => {
      dispatch({
        type: types.RECEIVE_MESSAGE,
        payload: message,
      });
    });

    socket.on('new-chat', ({ chat }) => {
      dispatch({
        type: types.RECEIVE_NEW_CHAT,
        payload: { chat },
      });
    });

    socket.on('deleted-chat', ({ chat }) => {
      const { activeId } = getState().chats;

      dispatch({
        type: types.RECEIVE_DELETED_CHAT,
        payload: { chat },
      });
      /* eslint-disable no-underscore-dangle */
      if (activeId === chat._id) dispatch(redirect('/chat'));
      /* eslint-enable no-underscore-dangle */
    });
    return Promise.resolve();
  };
}

export function sendMessage(content) {
  return (dispatch, getState) => {
    const { activeId } = getState().chats;

    if (!socket) {
      dispatch(lostSocketConnection());
    }

    socket.emit(
      'send-message',
      {
        chatId: activeId,
        content,
      },
      () => {
        // on success callback
        dispatch({
          type: types.SEND_MESSAGE,
          payload: {
            chatId: activeId,
            content,
          },
        });
      },
    );
    return Promise.resolve();
  };
}

export function mountChat(chatId) {
  return (dispatch) => {
    if (!socket) {
      dispatch(lostSocketConnection());
    }

    socket.emit('mount-chat', chatId);

    dispatch({
      type: types.MOUNT_CHAT,
      payload: chatId,
    });
  };
}

export function unmountChat(chatId) {
  return (dispatch) => {
    if (!socket) {
      dispatch(lostSocketConnection());
    }

    socket.emit('unmount-chat', chatId);

    dispatch({
      type: types.UNMOUNT_CHAT,
      payload: chatId,
    });
  };
}
