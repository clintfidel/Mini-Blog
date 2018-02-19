import { SIGNUP_USER, SIGNIN_USER } from '../actions/types';

const initialState = {
  user: {},
  authenticated: false,
  error: ''
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

    default:
      return state;
  }
}
export default AuthReducer;
