import express from 'express';
import articles from '../controllers/articles';
import { isLoggedIn } from '../middlewares/Authorization';
import { checkArticleInput,
  verifyUserIdExist, verifyBlogIdExist,
  blogTitleExist } from '../middlewares/Validation';

const { create, deleteArticle } = articles;
const app = express.Router();

app.route('/')
  .post(
    isLoggedIn, checkArticleInput,
    blogTitleExist, verifyUserIdExist, create
  );

app.route('/delete/:blogId')
  .delete(isLoggedIn, verifyUserIdExist, verifyBlogIdExist, deleteArticle);

export default app;
