import {applyMiddleware} from 'redux';
import userMiddleware from './userMiddleware';

export default applyMiddleware(userMiddleware);
