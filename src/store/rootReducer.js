import { combineReducers } from 'redux';

import { firstDataReducer } from './data/firstData';

export const rootReducer = combineReducers({
  firstData: firstDataReducer,
});
