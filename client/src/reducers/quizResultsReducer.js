import { TAKE_QUIZ } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case TAKE_QUIZ:
      return {...state, ...action.payload};

    default: return state;
  }
}
