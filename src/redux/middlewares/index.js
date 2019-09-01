import {applyMiddleware} from 'redux';
import userMiddleware from './userMiddleware';
import feedMiddleware from './feedMiddleware';

export default applyMiddleware(userMiddleware, feedMiddleware);
