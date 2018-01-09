import express from 'express';
import user from '../controllers/user';
import { isLoggedIn, isAdmin } from '../middlewares/Authorization';
import { checkUserInput, isSignedUpWithEmail,
  isSignedUpWithUsername, validateEdituser,
  validateLogin } from '../middlewares/Validation';

const app = express.Router();

app.route('/signup')
  .post(
    checkUserInput, isSignedUpWithEmail,
    isSignedUpWithUsername, user.signUp
  );

app.route('/signIn')
  .post(isLoggedIn, validateLogin, user.login);


app.route('/editprofile')
  .put(isLoggedIn, isSignedUpWithEmail, validateEdituser, user.editProfile);

app.route('/')
  .get(isLoggedIn, isAdmin, user.getAllUsers);
export default app;

