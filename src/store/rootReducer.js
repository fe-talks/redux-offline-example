import { combineReducers } from 'redux';

import { firstDataReducer } from './data/firstData';
import { postsReducer } from './data/posts';

export const rootReducer = combineReducers({
  firstData: firstDataReducer,
  posts: postsReducer,
});
