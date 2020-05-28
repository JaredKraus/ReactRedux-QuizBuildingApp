import { CREATE_QUIZ, FETCH_QUIZ, FETCH_QUIZZES, EDIT_QUIZ, DELETE_QUIZ, FETCH_USER_QUIZ} from './types'
import axios from '../apis/axios'
import history from '../history';

// createQuiz gets user id from Google Auth
// posts form values and userId to api and dispatches response data to reducer
// returns user to their profile page upon success using history
export const createQuiz = formValues => async (dispatch, getState) => {
  const { userId } = getState().gauth;
  const response = await axios.post('/quizzes', {...formValues, userId})
  dispatch({ type: CREATE_QUIZ, payload: response.data})
  history.push(`/quizzes/my/${userId}`)
}

// fetchQuizzes gets all quizzes from api and dispatches to reducer
export const fetchQuizzes = () => async dispatch => {
  const response = await axios.get('/quizzes');
  dispatch({ type: FETCH_QUIZZES, payload: response.data })
}

//fetchUserQuiz is called with current userId and gets all quizzes that match that userId
export const fetchUserQuiz = (userId) => async dispatch => {
  const response = await axios.get(`/quizzes/?userId=${userId}`)
  dispatch({ type: FETCH_USER_QUIZ, payload: response.data})
}

// fetchQuiz gets called with quiz id and gets that quiz
export const fetchQuiz = (id) => async dispatch => {
  const response = await axios.get(`/quizzes/${id}`);
  dispatch({ type: FETCH_QUIZ, payload: response.data })
}

//editQuiz gets called with id and form values and patches the api for the givind id
// returns user to their profile page upon success using history
export const editQuiz = (id, formValues) => async (dispatch, getState) => {
  const { userId } = getState().gauth;
  const response = await axios.patch(`/quizzes/${id}`, formValues);
  dispatch({ type: EDIT_QUIZ, payload: response.data });
  history.push(`/quizzes/my/${userId}`)
}

// delete quiz gets called with id and deletes the quiz from the api
// returns user to their profile page upon success using history
export const deleteQuiz = (id) => async (dispatch, getState) => {
  const { userId } = getState().gauth;
  await axios.delete(`/quizzes/${id}`);
  dispatch({ type: DELETE_QUIZ, payload: id })
  history.push(`/quizzes/my/${userId}`)
}
