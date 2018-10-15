import fetch from 'isomorphic-fetch'; //Fix IE, Opera Mini issues.

import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../constants';

export function signup(username, password) { 
  return (dispatch) => {
    dispatch ({
      type: SIGNUP_REQUEST,
    });  

    return fetch('http://localhost:8000/v1/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.success) { 
        return json;
      }
      throw new Error(json.message);
    })
    .then (json => {
      if (!json.token) {
        throw new Error('No token provided!');
      }
      localStorage.setItem('token', json.token);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: json
      })
    })
    .catch(reason => dispatch({
      type: SIGNUP_FAILURE,
      payload: reason
    }));
  }
}

export function login(username, password) {
  return (dispatch) => {
    dispatch ({
      type: LOGIN_REQUEST,
    });

    return fetch('http://localhost:8000/v1/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.success) { 
        return json;
      }
      throw new Error(json.message); 
    })
    .then (json => {
      if (!json.token) {
        throw new Error('No token provided!');
      }
      localStorage.setItem('token', json.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: json
      })
    })
    .catch(reason => dispatch({
      type: LOGIN_FAILURE,
      payload: reason
    }));
  }
}

export function logout(token) {
  return (dispatch) => {
    dispatch ({
      type: LOGOUT_REQUEST,
    });

    return fetch('http://localhost:8000/v1/logout', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.success) { 
        //... unsubscribe store here or not here ?
        localStorage.removeItem('token');
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: json
        })
      }
      throw new Error(json.message); 
    })
    .catch(reason => dispatch({
      type: LOGOUT_FAILURE,
      payload: reason
    }));
  }
}
