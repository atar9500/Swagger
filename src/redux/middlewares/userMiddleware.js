import ACTIONS from '../actions/types';
import {registerUser, loginUser} from '../../api/userApi';

/**
 * ACTIONS.LOGIN_USER: payload should be: 
 *  {
      email: 'john.doe@haha.com',
      password: '12345678'
    }
 * ACTIONS.REGISTER_USER: payload should be: 
 *  {
      email: 'john.doe@haha.com',
      password: '12345678'
    }
 */

const userMiddleware = store => next => action => {
  const {payload, type} = action;
  switch (type) {
    case ACTIONS.LOGIN_USER:
      loginUser(payload.email, payload.password)
        .then(data => {
          action.payload = data;
          next(action);
        })
        .catch(error => {
          action.payload = {
            isError: true,
            errorMessage: 'Something went wrong, please try again',
          };
          next(action);
        });
      return;
    case ACTIONS.REGISTER_USER:
      registerUser(payload.email, payload.password)
        .then(data => {
          action.payload = data;
          next(action);
        })
        .catch(error => {
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

export default userMiddleware;
