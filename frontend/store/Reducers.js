import { combineReducers } from 'redux';
import app from './Reducers/App';
import session from './Reducers/Session';
import stories from './Reducers/Stories';
import story from  './Reducers/Story';
import user from  './Reducers/User';
import category from  './Reducers/Category';
import categories from  './Reducers/Categories';
import composer from './Reducers/Composer';
import activation from './Reducers/Activation';
import comments from './Reducers/Comments';

const rootReducer = combineReducers({
  session,
  stories,
  story,
  user,
  category,
  categories,
  comments,
  composer,
  activation,
  app
});

export default rootReducer;
