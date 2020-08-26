import { GET_ALL, SET_LOADING, STATE_NAME } from 'state/organizations/constant';
import { notification } from 'antd';
import { ORGANIZATIONS, REPOSITORY } from 'constants/api';
import { sleep } from 'utils/helper';

export const setOrganizations = (payload) => ({
  type: GET_ALL,
  payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const onFetchAllUserOrganizations = (userName) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await ORGANIZATIONS.GET_ALL_ORGANIZATIONS_BY_USER(userName);
    dispatch(setOrganizations(data));
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
