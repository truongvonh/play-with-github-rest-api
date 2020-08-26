import {
  SET_ALL,
  SET_DETAIL,
  SET_KEY_WORD,
  SET_LOADING,
} from 'state/users/constant';

export const initState = {
  users: [],
  detailUser: null,
  loading: false,
  keyword: '',
};

const usersReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_KEY_WORD:
      return { ...state, keyword: payload };
    case SET_ALL:
      return { ...state, users: payload };
    case SET_DETAIL:
      return { ...state, detailUser: payload };
    default:
      return state;
  }
};

export default usersReducer;
