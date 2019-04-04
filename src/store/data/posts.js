import { createAction, handleActions } from 'redux-actions';
import { omit } from 'lodash';

import { ADD_POST, COMMIT_ADD_POST, ROLLBACK_ADD_POST } from '../actionNames';

/*
Actions
 */
export const addPost = createAction(
  ADD_POST,
  post => post,
  post => ({
    offline: {
      // the network action to execute:
      effect: {
        url: 'http://localhost:3001/posts',
        method: 'POST',
        json: post,
      },
      // action to dispatch when effect succeeds:
      commit: { type: COMMIT_ADD_POST, meta: post },
      // action to dispatch if network action fails permanently:
      rollback: { type: ROLLBACK_ADD_POST, meta: post },
    },
  })
);

/*
Reducer
 */
const defaultState = {
  ids: [],
  data: {},
};
export const postsReducer = handleActions(
  {
    [ADD_POST]: (state, action) => {
      console.log('ADD_POST in posts reducer', action);
      const post = action.payload;

      return {
        ...state,
        ids: [...state.ids, post.internalId],
        data: { ...state.data, [post.internalId]: post },
      };
    },

    [COMMIT_ADD_POST]: (state, action) => {
      const originalPost = action.meta;
      const beData = action.payload;

      // 1. replace previous internalId in ids to real id:
      const ids = [...state.ids];
      ids[ids.indexOf(originalPost.internalId)] = beData.id;

      // 2. replace data in data
      const data = omit(state.data, [originalPost.internalId]);
      data[beData.id] = beData; // we can do it - omit returns new object

      // to fully support duplex (and take updates from BE it should contain modifiedAt/createdAt etc
      return { ...state, ids, data };
    },

    [ROLLBACK_ADD_POST]: (state, action) => {
      const originalPost = action.meta;
      const data = {
        ...state.data,
        [originalPost.internalId]: {
          ...state.data[originalPost.internalId],
          syncError: true, // we don't want to lost this data so we mark it as problem with sync to give ability to retry
        },
      };

      return { ...state, data };
    },
  },
  defaultState
);

/*
Selectors
 */
export const getPosts = state => state.posts;
export const getPostsIds = state => getPosts(state).ids;
export const getPostsData = state => getPosts(state).data;
