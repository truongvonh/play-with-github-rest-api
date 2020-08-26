import {
  REPOSITORY_STATE_NAME,
  repositoryReducer,
} from 'state/repositories/index';
import { USERS_STATE_NAME, usersReducer } from 'state/users/index';
import {
  ORGANIZATIONS_STATE_NAME,
  organizationsReducer,
} from 'state/organizations/index';
import { combineReducers } from 'redux';

export default combineReducers({
  [REPOSITORY_STATE_NAME]: repositoryReducer,
  [USERS_STATE_NAME]: usersReducer,
  [ORGANIZATIONS_STATE_NAME]: organizationsReducer,
});
