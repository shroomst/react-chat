import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../constants';

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isAuthenticated: !!token,
  user,
  token,
  errorSignInMessage: '',
  errorRegisterMessage: '',
};

export default function auth(state = initialState, action) { // clear function для одного и того же входного значения тот же результат и не изменяет ничего снаружи себя
  switch (action.type) {
    case SIGNUP_SUCCESS: //обработка actions
    case LOGIN_SUCCESS:
      return {
        ...state, // берет предыдущее состояние и переписывает в его копии только то, что ниже
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        errorSignInMessage: '',
        errorRegisterMessage: '',
      }
    case SIGNUP_FAILURE:
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      token: '',
      errorRegisterMessage: action.payload.message,
    }
    case LOGIN_FAILURE:
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      token: '',
      errorSignInMessage: action.payload.message,
    }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '',
      }
    default:
      return state;
  }
}
