import express from 'express';
import article from '../controllers/articles';
import { isLoggedIn } from '../middlewares/Authorization';
import { checkArticleInput,
  verifyUserIdExist, blogTitleExist } from '../middlewares/Validation';

const app = express.Router();

app.route('/')
  .post(
    isLoggedIn, checkArticleInput,
    blogTitleExist, verifyUserIdExist, article.create
  );


export default app;
