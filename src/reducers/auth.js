import * as types from '../constants/auth';
import * as userTypes from '../constants/users';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  user: null,
  token,
  errorSignInMessage: '',
  errorRegisterMessage: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        errorSignInMessage: '',
        errorRegisterMessage: '',
      }
    case types.SIGNUP_FAILURE:
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      token: '',
      errorRegisterMessage: action.payload.message,
    }
    case types.LOGIN_FAILURE:
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      token: '',
      errorSignInMessage: action.payload.message,
    }
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '',
        errorSignInMessage: ''
      }
    case types.RECEIVE_AUTH_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '',
        errorSignInMessage: 'Session expired. Please login again.'
      }
    case types.RECEIVE_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      }
    case userTypes.SAVE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      }
    default:
      return state;
  }
}
