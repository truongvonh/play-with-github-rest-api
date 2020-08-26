import {
  GET_ALL,
  SET_LOADING,
  SET_PAGE,
  SET_USER_NAME,
} from 'state/repositories/constant';

export const initState = {
  repositories: [],
  userName: '',
  page: 1,
  perPage: 1000,
  loading: false,
};

const repositoryReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    case GET_ALL:
      return { ...state, repositories: payload };
    case SET_USER_NAME:
      return { ...state, userName: payload };
    case SET_PAGE:
      return { ...state, page: payload };
    default:
      return state;
  }
};

export default repositoryReducer;
