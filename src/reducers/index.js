import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { data } from './data.reducer';

import chartDataReducer from './chartDataSlice';
import navigationReducer from "./navigationSlice";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  data,
  chart_data: chartDataReducer,
  navigation: navigationReducer,
});

export default rootReducer;