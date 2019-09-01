import ACTIONS from '../actions/types';
import {createSelector} from 'reselect';

/**
 * ACTIONS.GET_ALL_POSTS: payload should be: 
 *  {
 *    posts: [],
      isError: false,
      errorMessage: '',

      // For userReducer use only!
      unauthorized: true
    }
 */

const DEFAULT_STATE = {
  posts: [],
  isError: false,
  errorMessage: '',
};

const feedReducer = (state = DEFAULT_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case ACTIONS.GET_ALL_POSTS:
      return Object.assign({}, state, {
        posts: payload.posts,
        isError: payload.isError,
        errorMessage: payload.errorMessage,
      });
    default:
      return state;
  }
};

const selectFeedReducer = ({feedReducer}) => feedReducer;
export const selectPosts = createSelector(
  selectFeedReducer,
  ({posts}) => posts,
);
export const selectFeedError = createSelector(
  selectFeedReducer,
  ({isError}) => isError,
);
export const selectFeedErrorMessage = createSelector(
  selectFeedReducer,
  ({errorMessage}) => errorMessage,
);

export default feedReducer;
