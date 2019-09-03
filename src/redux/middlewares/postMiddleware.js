import ACTIONS from '../actions/types';
import {addPost} from '../../api/postApi';

/**
 * ACTIONS.ADD_POST: payload should be: 
 *  {
      token: 'abcdefg',
      title: 'test',
      url: 'data:image/png;base64,iVBORw0K...'
    }
 */

const CLEAR_POST_REDUCER_ACTION = {type: ACTIONS.CLEAR_POST_REDUCER};

const postMiddleware = store => next => action => {
  const {payload, type} = action;
  switch (type) {
    case ACTIONS.ADD_POST:
      addPost(payload.token, payload.title, payload.url)
        .then(data => {
          action.payload = data;
          next(action);
          setTimeout(() => {
            next(CLEAR_POST_REDUCER_ACTION);
          }, 5000);
        })
        .catch(() => {
          action.payload = {
            uploadSuccess: false,
            unauthorized: false,
            errorMessage:
              'Something went wrong, please check your internet connection',
          };
          next(action);
        });
      return;
    default:
      return next(action);
  }
};

export default postMiddleware;
