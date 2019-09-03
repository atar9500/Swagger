import ACTIONS from './types';

export const loginUser = (email, password) => ({
  type: ACTIONS.LOGIN_USER,
  payload: {email: email, password: password},
});

export const registerUser = (email, password) => ({
  type: ACTIONS.REGISTER_USER,
  payload: {email: email, password: password},
});

export const getAllPosts = token => ({
  type: ACTIONS.GET_ALL_POSTS,
  payload: {token: token},
});

export const addPost = (token, title, url) => ({
  type: ACTIONS.ADD_POST,
  payload: {token: token, title: title, url: url},
});
