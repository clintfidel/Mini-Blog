import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ArticleReducer from './ArticlesReducer';


const rootReducer = combineReducers({
  AuthReducer,
  ArticleReducer
});

export default rootReducer;
