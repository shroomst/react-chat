import * as types from '../constants/auth';
import * as userTypes from '../constants/users';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  user: null,
  token,
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
      }
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.LOGOUT_SUCCESS:
    case types.RECEIVE_AUTH_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '',
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
