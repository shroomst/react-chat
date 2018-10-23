import history from '../utils/history';
import * as types from '../constants'

export default function redirect(to) {
  return (dispatch) => {
    history.push(/*`${process.env.PUBLIC_URL}/${to}`*/to);
    dispatch({
      type: types.REDIRECT,
      payload: { to },
    })
  }
}
