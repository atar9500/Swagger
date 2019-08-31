import AsyncStorage from '@react-native-community/async-storage';

const FILE_NAME = 'localStorageManager';

const KEYS = {
  USER_DATA: 'user_data',
  POSTS: 'posts',
};

export const saveUserData = async data => {
  try {
    await AsyncStorage.setItem(KEYS.USER_DATA, JSON.stringify(data));
  } catch (error) {
    console.error(`${FILE_NAME}.saveUserData: ${error}`);
  }
};

export const savePosts = async posts => {
  try {
    await AsyncStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
  } catch (error) {
    console.error(`${FILE_NAME}.savePosts: ${error}`);
  }
};

export const getInitialStore = async () => {
  try {
    const store = {
      userReducer: {isError: false, errorMessage: ''},
    };
    const storage = await getAllStorage();
    const {email, password, token, isLogin} = storage[KEYS.USER_DATA];
    store.userReducer.data = {email, password, token};
    store.userReducer.isLogin = isLogin;
    return store;
  } catch (error) {
    console.error(`${FILE_NAME}.getInitialState: ${error}`);
  }
};

const getItem = async key => {
  try {
    const rawSavedItem = await AsyncStorage.getItem(key);
    let savedItem = getDefaultValuePerKey(key);
    if (!!rawSavedItem) {
      savedItem = JSON.parse(rawSavedItem);
    }
    return savedItem;
  } catch (error) {
    console.error(`${FILE_NAME}.getItem: ${error}`);
  }
};

const clearSavedData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(`${FILE_NAME}.clearSavedData: ${error}`);
  }
};

const getAllStorage = async () => {
  try {
    let storage = {};
    const rawData = await AsyncStorage.multiGet(Object.values(KEYS));
    rawData.forEach(data => {
      const key = data[0];
      let value = data[1];
      if (!value) {
        storage[key] = getDefaultValuePerKey(key);
      } else {
        switch (key) {
          case KEYS.USER_DATA:
            storage[key] = JSON.parse(value);
            break;
        }
      }
    });
    return storage;
  } catch (error) {
    console.error(`${FILE_NAME}.getAllStorage: ${error}`);
  }
};

const getDefaultValuePerKey = key => {
  switch (key) {
    case KEYS.USER_DATA:
      return {email: '', password: '', token: '', isLogin: false};
  }
};
