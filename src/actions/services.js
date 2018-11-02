import history from '../utils/history';
import * as types from '../constants';

// eslint-disable-next-line
export function redirect(to) {
  return (dispatch) => {
    history.push({ to });
    dispatch({
      type: types.REDIRECT,
      payload: { to },
    });
  };
}
