import ACTIONS from '../actions/types';
import {createSelector} from 'reselect';

/**
 * ACTIONS.LOGIN_USER: payload should be: 
 *  {
 *    isLogin: true,
      isError: false,
      // if 'isError is false
      data: {
        email: 'john.doe@haha.com',
        token: 'Bearer ABCDEFG...',
        id: 3
      },
      // if 'isError' is true:
      errorMessage: 'BLABLABLA'
    }
 * ACTIONS.REGISTER_USER: payload should be:
 *  {
 *    isLogin: true,
      isError: false,
      // if 'isError is false
      data: {
        email: 'john.doe@haha.com',
        token: 'Bearer ABCDEFG...',
        id: 3
      },
      // if 'isError' is true:
      errorMessage: 'BLABLABLA'
    }
 */

const DEFAULT_STATE = {
  data: {email: '', token: '', userId: ''},
  isLogin: null,
  isError: false,
  errorMessage: '',
};

const userReducer = (state = DEFAULT_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case ACTIONS.LOGIN_USER:
    case ACTIONS.REGISTER_USER:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};

const selectUserReducer = ({userReducer}) => userReducer;
const selectUserData = createSelector(
  selectUserReducer,
  ({data}) => data,
);
export const selectUserEmail = createSelector(
  selectUserData,
  ({email}) => email,
);
export const selectUserId = createSelector(
  selectUserData,
  ({id}) => id,
);
export const selectUserToken = createSelector(
  selectUserData,
  ({token}) => token,
);
export const selectIsLogin = createSelector(
  selectUserReducer,
  ({isLogin}) => isLogin,
);
export const selectLoginError = createSelector(
  selectUserReducer,
  ({isError}) => isError,
);
export const selectErrorMessage = createSelector(
  selectUserReducer,
  ({errorMessage}) => errorMessage,
);

export default userReducer;
