import express from 'express';
import user from '../controllers/UserController';
import { isLoggedIn, isAdmin } from '../middlewares/Authorization';
import { checkUserInput, isSignedUpWithEmail,
  isSignedUpWithUsername, validateEdituser,
  validateLogin } from '../middlewares/Validation';

const {
  signUp, login, editProfile, getAllUsers
} = user;
const userRouter = express.Router();

userRouter.route('/signup')
  .post(
    checkUserInput, isSignedUpWithEmail,
    isSignedUpWithUsername, signUp
  );

userRouter.route('/signIn')
  .post(validateLogin, login);


userRouter.route('/editprofile')
  .put(isLoggedIn, isSignedUpWithEmail, validateEdituser, editProfile);

userRouter.route('/')
  .get(isLoggedIn, isAdmin, getAllUsers);

export default userRouter;

