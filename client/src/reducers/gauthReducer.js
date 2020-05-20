import {AUTH_STATUS} from '../actions/types.js';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_STATUS:
      return {...state, isSignedIn: action.payload.isSignedIn, userId: action.payload.userId };
    default:
      return state;
  }
}
