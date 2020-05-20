import { AUTH_STATUS } from './types';
import googleAuth from '../apis/googleAuth';

const gauth = new googleAuth();

export const initAuth = () => dispatch => {
  gauth.init().then(() => {
    dispatch(changeAuth());
    gauth.listen(() => { dispatch(changeAuth()) });
  })
}

export const changeAuth = () => dispatch => {
  const isSignedIn = gauth.isSignedIn()
  const userId = isSignedIn ? gauth.userId() : null;
  dispatch({type: AUTH_STATUS, payload: { isSignedIn: isSignedIn, userId: userId } })
}


export const trySignIn = () => () => {
  gauth.signIn()
}

export const trySignOut = () => () => {
  gauth.signOut()
}
