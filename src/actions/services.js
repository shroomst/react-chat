import history from '../utils/history';
import * as types from '../constants';

// eslint-disable-next-line
export default function redirect(to) {
  return (dispatch) => {
    history.push(`${process.env.PUBLIC_URL}/${to}`);
    dispatch({
      type: types.REDIRECT,
      payload: { to },
    });
  };
}
