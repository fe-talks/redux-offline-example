import { createAction, handleActions } from 'redux-actions';

import { SET_SOME } from '../actionNames';

/*
Actions
 */
export const setSome = createAction(SET_SOME);

/*
Reducer
 */
const defaultState = {
  some: null,
};
export const firstDataReducer = handleActions(
  {
    [SET_SOME]: (state, action) => {
      return { ...state, some: action.payload };
    },
  },
  defaultState
);

/*
Selectors
 */
export const getFirstData = state => state.firstData;
export const getSome = state => getFirstData(state).some;
