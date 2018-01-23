import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorization from '../utils/Authorization';
import { SIGNIN_USER, SIGNUP_USER, SIGNUP_ERROR } from './types';

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

/**
 * @description - Set error when signup error
 *
 * @param {Object} userError - Decoded JWT Token
 *
 * @returns {Object} - redux action to be dispatched
 */
export function error(userError) {
  return {
    type: SIGNUP_ERROR,
    userError
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
  .catch((userError) => {
    dispatch(error(userError.response.data));
  });

export const loginAction = userDetails => dispatch => axios
  .post('/api/v1/users/signin', userDetails)
  .then((response) => {
    const { token } = response.data;
    setAuthorization(token);
    localStorage.setItem('token', token);
    const currentUser = jwtDecode(token);
    dispatch(signin(currentUser));
  })
  .catch((userError) => {
    dispatch(error(userError.response.data));
  });
