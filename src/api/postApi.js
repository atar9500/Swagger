import {
  ADD_POST_URL,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
  STATUS_BAD_REQUEST,
} from './urls';
import {clearSavedData} from '../utils/localStorageManager';

export const addPost = async (token, title, url) => {
  try {
    let response = await fetch(ADD_POST_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        image_url: url,
      }),
    });
    let responseJson = await response.json();
    switch (response.status) {
      case STATUS_UNAUTHORIZED:
        await clearSavedData();
        return {uploadSuccess: false, errorMessage: '', unauthorized: true};
      case STATUS_BAD_REQUEST:
        return {
          uploadSuccess: false,
          errorMessage: responseJson.msg,
          unauthorized: false,
        };
      case STATUS_OK:
        return {uploadSuccess: true, errorMessage: '', unauthorized: false};
    }
  } catch (error) {
    console.error('addPost', error);
  }
};
