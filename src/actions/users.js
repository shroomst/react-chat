import callApi from '../utils/callapi'
import * as types from '../constants/users';

export function saveUserInfo(username, firstName, lastName) {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch({
      type: types.SAVE_USER_INFO_REQUEST,
      payload: { username, firstName, lastName }
    });

    return callApi('/users/me', token, { method: 'POST' }, { data: { username, firstName, lastName} })
      .then(data => {
        dispatch({
          type: types.SAVE_USER_INFO_SUCCESS,
          payload: data
        });

        return data;
      })
      .catch(reason => dispatch({
        type: types.SAVE_USER_INFO_FAILURE,
        payload: reason
      }))
  }
}
