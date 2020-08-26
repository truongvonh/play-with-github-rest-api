import { GET_ALL, SET_LOADING } from 'state/organizations/constant';

export const initState = {
  organizations: [],
  loading: false,
};

const repositoryReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    case GET_ALL:
      return { ...state, organizations: payload };
    default:
      return state;
  }
};

export default repositoryReducer;
