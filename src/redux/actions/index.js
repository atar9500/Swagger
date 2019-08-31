import ACTIONS from './types';

export const loginUser = (email, password) => ({
  type: ACTIONS.LOGIN_USER,
  payload: {email: email, password: password},
});

export const registerUser = (email, password) => ({
  type: ACTIONS.REGISTER_USER,
  payload: {email: email, password: password},
});
