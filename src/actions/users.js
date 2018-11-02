import callApi from '../utils/callapi';
import * as types from '../constants/users';

// eslint-disable-next-line
export function saveUserInfo(username, firstName, lastName) {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.saveUserInfo) {
      return Promise.resolve();
    }

    dispatch({
      type: types.SAVE_USER_INFO_REQUEST,
      payload: { username, firstName, lastName },
    });

    return callApi(
      '/users/me',
      token,
      { method: 'POST' },
      { data: { username, firstName, lastName } },
    )
      .then((json) => {
        dispatch({
          type: types.SAVE_USER_INFO_SUCCESS,
          payload: json,
        });

        return json;
      })
      .catch(reason => dispatch({
        type: types.SAVE_USER_INFO_FAILURE,
        payload: reason,
      }));
  };
}
