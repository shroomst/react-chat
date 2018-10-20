import * as types from '../constants';

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
    case types.SIGNUP_SUCCESS: //обработка actions
    case types.LOGIN_SUCCESS:
      return {
        ...state, // берет предыдущее состояние и переписывает в его копии только то, что ниже
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
      }
    case types.RECEIVE_AUTH_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '',
        errorSignInMessage: 'Session expired. Please login'
      }
    case types.RECEIVE_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      }
    default:
      return state;
  }
}
