import {combineReducers} from 'redux';
import userReducer from './userReducer';
import feedReducer from './feedReducer';

const AppReducers = combineReducers({
  userReducer,
  feedReducer,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

export default rootReducer;
