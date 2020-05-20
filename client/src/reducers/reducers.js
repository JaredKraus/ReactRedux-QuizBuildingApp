import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import gauthReducer from './gauthReducer';
import quizReducer from './quizReducer';

export default combineReducers({
  gauth: gauthReducer,
  form: formReducer,
  quizzes: quizReducer
});
