import {combineReducers} from 'redux';
import userReducer from './userReducer';

const AppReducers = combineReducers({
  userReducer,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

export default rootReducer;
