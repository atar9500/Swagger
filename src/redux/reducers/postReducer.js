import ACTIONS from '../actions/types';
import {createSelector} from 'reselect';

/**
 * ACTIONS.ADD_POST: payload should be: 
 *  {
 *    uploadSuccess: false,
      errorMessage: 'this is a test',
      unauthorized: false,
    }
 */

const DEFAULT_STATE = {
  uploadSuccess: false,
  errorMessage: '',
  unauthorized: false,
};

const postReducer = (state = DEFAULT_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case ACTIONS.ADD_POST:
      return Object.assign({}, state, payload);
    case ACTIONS.CLEAR_POST_REDUCER:
      return Object.assign({}, state, {
        uploadSuccess: false,
        errorMessage: '',
        unauthorized: false,
      });
    default:
      return state;
  }
};

const selectPostReducer = ({postReducer}) => postReducer;
export const selectUploadSuccess = createSelector(
  selectPostReducer,
  ({uploadSuccess}) => uploadSuccess,
);
export const selectPostError = createSelector(
  selectPostReducer,
  ({errorMessage}) => errorMessage,
);
export const selectPostUnauthorized = createSelector(
  selectPostReducer,
  ({unauthorized}) => unauthorized,
);

export default postReducer;
