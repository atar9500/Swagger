import {combineReducers} from 'redux';
import userReducer from './userReducer';
import feedReducer from './feedReducer';
import postReducer from './postReducer';

const AppReducers = combineReducers({
  userReducer,
  feedReducer,
  postReducer,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

export default rootReducer;
