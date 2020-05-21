import { CREATE_QUIZ, FETCH_QUIZ, FETCH_QUIZZES, EDIT_QUIZ, DELETE_QUIZ, FETCH_USER_QUIZ} from './types'
import axios from '../apis/axios'
import history from '../history';

export const createQuiz = formValues => async (dispatch, getState) => {
  const { userId } = getState().gauth;
  const response = await axios.post('/quizzes', {...formValues, userId})

  dispatch({ type: CREATE_QUIZ, payload: response.data})

  history.push(`/quizzes/my/${userId}`)
}

export const fetchQuizzes = () => async dispatch => {
  const response = await axios.get('/quizzes');

  dispatch({ type: FETCH_QUIZZES, payload: response.data })
}

export const fetchUserQuiz = (userId) => async dispatch => {
  const response = await axios.get(`/quizzes/?userId=${userId}`)

  dispatch({ type: FETCH_USER_QUIZ, payload: response.data})
}

export const fetchQuiz = (id) => async dispatch => {
  const response = await axios.get(`/quizzes/${id}`);

  dispatch({ type: FETCH_QUIZ, payload: response.data })
}

export const editQuiz = (id, formValues) => async (dispatch, getState) => {
  const { userId } = getState().gauth;
  const response = await axios.patch(`/quizzes/${id}`, formValues);

  dispatch({ type: EDIT_QUIZ, payload: response.data });
  history.push(`/quizzes/my/${userId}`)
}

export const deleteQuiz = (id) => async (dispatch, getState) => {
  const { userId } = getState().gauth;
  await axios.delete(`/quizzes/${id}`);

  dispatch({ type: DELETE_QUIZ, payload: id })
  history.push(`/quizzes/my/${userId}`)
}
