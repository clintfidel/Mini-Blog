import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorization from '../utils/Authorization';
// import toastrOption from '../utils/toastrOption';
import { SIGNIN_USER, SIGNUP_USER } from './types';


// toastrOption();
/**
 * @description - Set current signed up user
 *
 * @param {Object} user - Decoded JWT Token
 *
 * @returns {Object} - redux action to be dispatched
 */
export function signup(user) {
  return {
    type: SIGNUP_USER,
    user
  };
}
/**
 * @description - Set current signed up user
 *
 * @param {Object} user - Decoded JWT Token
 *
 * @returns {Object} - redux action to be dispatched
 */
export function signin(user) {
  return {
    type: SIGNIN_USER,
    user
  };
}

export const registerAction = userDetails => dispatch => axios
  .post('/api/v1/users/signup', userDetails)
  .then((response) => {
    const { token } = response.data;
    setAuthorization(token);
    localStorage.setItem('token', token);
    const currentUser = jwtDecode(token);
    dispatch(signup(currentUser));
  })
  .catch(error =>
    Promise.reject(error.response.data.message));

export const loginAction = userDetails => dispatch => axios
  .post('/api/v1/users/signin', userDetails)
  .then((responses) => {
    const { token } = responses.data;
    setAuthorization(token);
    localStorage.setItem('token', token);
    const currentUser = jwtDecode(token);
    dispatch(signin(currentUser));
  })
  .catch(error => Promise.reject(error.response.data.message));
