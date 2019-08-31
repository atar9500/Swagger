import {LOGIN_URL, REGISTER_URL, STATUS_OK, STATUS_BAD_REQUEST} from './urls';
import {saveUserData} from '../utils/localStorageManager';

export const loginUser = async (email, password) => {
  try {
    const {status, body} = await signUser(email, password, LOGIN_URL);
    console.log('loginUser', {status, body});
    switch (status) {
      case STATUS_OK:
        await saveUserData({...body.data, isLogin: true});
        return {
          isLogin: true,
          isError: false,
          errorMessage: '',
          data: body.data,
        };
      case STATUS_BAD_REQUEST:
        console.error('BAD REQUEST!');
        return {
          isLogin: false,
          isError: true,
          errorMessage: body.msg,
        };
    }
  } catch (error) {
    console.error('loginUser', error);
  }
};

export const registerUser = async (email, password) => {
  try {
    const {status, body} = await signUser(email, password, REGISTER_URL);
    console.log('registerUser', {status, body});
    switch (status) {
      case STATUS_OK:
        await saveUserData({...body.data, isLogin: true});
        return {
          isLogin: true,
          isError: false,
          errorMessage: '',
          data: body.data,
        };
      case STATUS_BAD_REQUEST:
        return {
          isLogin: false,
          isError: true,
          errorMessage: body.msg,
        };
    }
  } catch (error) {
    console.error('registerUser', error);
  }
};

const signUser = async (email, password, url) => {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let responseJson = await response.json();
    return {status: response.status, body: responseJson};
  } catch (error) {
    console.error('signUser', error);
  }
};
