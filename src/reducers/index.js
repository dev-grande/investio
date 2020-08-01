import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { data } from './data.reducer';
import navigationReducer from "./navigationSlice";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  data,
  navigation: navigationReducer,
});

export default rootReducer;