import { GET_ALL, SET_LOADING } from 'state/repositories/constant';
import { notification } from 'antd';
import { REPOSITORY } from 'constants/api';
import { sleep } from 'utils/helper';

export const setRepositories = (payload) => ({
  type: GET_ALL,
  payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const onFetchAllUserRepo = (userName) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await REPOSITORY.GET_ALL_REPOS_BY_USER(userName);
    dispatch(setRepositories(data));
  } catch ({ message }) {
    notification.error({
      message: 'Errors',
      description: message,
    });
  } finally {
    await sleep(500);
    dispatch(setLoading(false));
  }
};
