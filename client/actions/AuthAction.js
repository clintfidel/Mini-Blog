import * as Types from './types';


export const signup = user => ({
  type: Types.SIGNUP_USER,
  user
});

export const signin = user => ({
  type: Types.SIGNIN_USER,
  user
});


export const error = message => ({
  type: Types.SIGNUP_ERROR,
  message
});

