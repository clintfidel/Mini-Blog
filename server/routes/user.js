import express from 'express';
import user from '../controllers/user';
import { checkUserInput, isSignedUpWithEmail,
  isSignedUpWithUsername,
  validateLogin, isLoggedIn } from '../middlewares/Validation';

const app = express.Router();

app.route('/signup')
  .post(
    checkUserInput, isSignedUpWithEmail,
    isSignedUpWithUsername, user.signUp
  );

app.route('/signIn')
  .post(isLoggedIn, validateLogin, user.login);
export default app;
