import {ALL_POSTS_URL, STATUS_OK, STATUS_UNAUTHORIZED} from './urls';
import {clearSavedData, savePosts} from '../utils/localStorageManager';

export const getFeed = async token => {
  try {
    let response = await fetch(ALL_POSTS_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    switch (response.status) {
      case STATUS_UNAUTHORIZED:
        await clearSavedData();
        return {posts: [], isError: true, errorMessage: '', unauthoried: true};
      case STATUS_OK:
        let responseJson = await response.json();
        await savePosts(responseJson.data);
        return {posts: responseJson.data, isError: false, errorMessage: ''};
    }
  } catch (error) {
    console.error('getFeed', error);
  }
};
