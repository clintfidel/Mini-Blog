import express from 'express';
import user from '../controllers/user';
import { isLoggedIn, isAdmin } from '../middlewares/Authorization';
import { checkUserInput, isSignedUpWithEmail,
  isSignedUpWithUsername, validateEdituser,
  validateLogin } from '../middlewares/Validation';

const {
  signUp, login, editProfile, getAllUsers
} = user;
const app = express.Router();

app.route('/signup')
  .post(
    checkUserInput, isSignedUpWithEmail,
    isSignedUpWithUsername, signUp
  );

app.route('/signIn')
  .post(validateLogin, login);


app.route('/editprofile')
  .put(isLoggedIn, isSignedUpWithEmail, validateEdituser, editProfile);

app.route('/')
  .get(isLoggedIn, isAdmin, getAllUsers);
export default app;

