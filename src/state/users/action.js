import {
  SET_ALL,
  SET_DETAIL,
  SET_KEY_WORD,
  SET_LOADING,
  STATE_NAME,
} from 'state/users/constant';
import { sleep } from 'utils/helper';
import { USERS } from 'constants/api';
import { notification } from 'antd';

export const setUsers = (payload) => ({
  type: SET_ALL,
  payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setKeyword = (payload) => ({
  type: SET_KEY_WORD,
  payload,
});

export const setDetailUser = (payload) => ({
  type: SET_DETAIL,
  payload,
});

export const onFetchAllUsers = () => async (dispatch, getState) => {
  const { keyword } = getState()[STATE_NAME];
  dispatch(setLoading(true));
  try {
    const query = {
      q: keyword,
    };
    const { items } = await USERS.SEARCH_USERS(query);
    dispatch(setUsers(items));
  } catch (e) {
    notification.error({
      message: 'Errors',
      description: e.message,
    });
  } finally {
    await sleep(300);
    dispatch(setLoading(false));
  }
};

export const fetchDetailUsers = (userName) => async (dispatch) => {
  try {
    const detailUser = await USERS.DETAIL_USER(userName);
    dispatch(setDetailUser(detailUser));
  } catch ({ message }) {
    notification.error({
      message: 'Errors',
      description: message,
    });
  }
};

export const onSearchUsers = (keyword) => (dispatch) => {
  dispatch(setKeyword(keyword));

  if (keyword.trim().length) dispatch(onFetchAllUsers());
};
