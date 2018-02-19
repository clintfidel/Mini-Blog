import { SIGNUP_USER, SIGNIN_USER, UNAUTH_USER } from '../actions/types';

const initialState = {
  user: {},
  authenticated: false,
  message: ''
};

/**
 * @description - User authentication reducer
 *
 * @param {Object} state - Default application state
 *
 * @param {Object} action - Response from the API
 *
 * @returns {Object} - Object containing new state
 */
function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return { ...state, user: action.user, authenticated: true };

    case SIGNIN_USER:
      return { ...state, user: action.user, authenticated: true };

    case UNAUTH_USER:
    return { ...state, user: action.user, authenticated: false, 
      message:'you have successfully Logged out' }

    default:
      return state;
  }
}
export default AuthReducer;
