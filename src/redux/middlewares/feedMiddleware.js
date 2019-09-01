import ACTIONS from '../actions/types';
import {getFeed} from '../../api/feedApi';

/**
 * ACTIONS.GET_ALL_POSTS: payload should be: 
 *  {
      token: 'ABCDEFG'
    }
 */

const feedMiddleware = store => next => action => {
  const {payload, type} = action;
  switch (type) {
    case ACTIONS.GET_ALL_POSTS:
      getFeed(payload.token)
        .then(data => {
          action.payload = data;
          next(action);
        })
        .catch(() => {
          action.payload = {
            isError: true,
            errorMessage: 'Something went wrong, please try again',
          };
          next(action);
        });
      return;
    default:
      return next(action);
  }
};

export default feedMiddleware;
