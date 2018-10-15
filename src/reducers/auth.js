import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../constants';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  user: null,
  token
};

export default function auth(state = initialState, action) { // clear function для того же входного значения тот же результат и не изменяет ничего снаружи себя
  console.log(action); // убрать
  switch (action.type) {
    case SIGNUP_SUCCESS: //обработка actions
    case LOGIN_SUCCESS:
      return {
        ...state, // берет предыдущее состояние и переписывает только то что ниже
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '' 
      }
    default:
      return state;
  }
}
