import {applyMiddleware} from 'redux';
import userMiddleware from './userMiddleware';
import feedMiddleware from './feedMiddleware';
import postMiddleware from './postMiddleware';

export default applyMiddleware(userMiddleware, feedMiddleware, postMiddleware);
