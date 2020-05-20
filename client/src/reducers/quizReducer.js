import _ from 'lodash';
import { CREATE_QUIZ, FETCH_QUIZ, FETCH_QUIZZES, EDIT_QUIZ, DELETE_QUIZ, FETCH_USER_QUIZ} from '../actions/types';

export default (state ={}, action) => {
  switch (action.type) {
    case FETCH_QUIZ: return {...state, [action.payload.id]: action.payload};
    case CREATE_QUIZ: return {...state, [action.payload.id]: action.payload};
    case EDIT_QUIZ: return {...state, [action.payload.id]: action.payload};
    case DELETE_QUIZ: return _.omit(state, action.payload);
    case FETCH_QUIZZES: return {...state, ..._.mapKeys(action.payload, 'id')};
    case FETCH_USER_QUIZ: return {...state, ..._.mapKeys(action.payload, 'id')};

    default: return state;
  }
}
