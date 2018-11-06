import callApi from '../utils/callapi';
import * as types from '../constants/auth';

export function signup(username, password) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.signup) {
      return Promise.resolve();
    }

    dispatch({
      type: types.SIGNUP_REQUEST,
    });

    return callApi('/signup', undefined, { method: 'POST' }, { username, password })
      .then((json) => {
        if (!json.token) {
          throw new Error('No token provided!');
        }
        localStorage.setItem('token', json.token);
        dispatch({
          type: types.SIGNUP_SUCCESS,
          payload: json,
        });
      })
      .catch(reason => dispatch({
        type: types.SIGNUP_FAILURE,
        payload: reason,
      }));
  };
}

export function login(username, password) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.login) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGIN_REQUEST,
    });

    return callApi('/login', undefined, { method: 'POST' }, { username, password })
      .then((json) => {
        if (!json.token) {
          throw new Error('No token provided!');
        }
        localStorage.setItem('token', json.token);
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: json,
        });
      })
      .catch(reason => dispatch({
        type: types.LOGIN_FAILURE,
        payload: reason,
      }));
  };
}

export function logout() {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.logout) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGOUT_REQUEST,
    });

    return callApi('/logout', token)
      .then((json) => {
        localStorage.removeItem('token');
        dispatch({
          type: types.LOGOUT_SUCCESS,
          payload: json,
        });
      })
      .catch(reason => dispatch({
        type: types.LOGOUT_FAILURE,
        payload: reason,
      }));
  };
}

export function receiveAuth() {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.receiveAuth) {
      return Promise.resolve();
    }

    dispatch({
      type: types.RECEIVE_AUTH_REQUEST,
    });

    return callApi('/users/me', token)
      .then(json => dispatch({
        type: types.RECEIVE_AUTH_SUCCESS,
        payload: json,
      }))
      .catch(reason => dispatch({
        type: types.RECEIVE_AUTH_FAILURE,
        payload: reason,
      }));
  };
}
