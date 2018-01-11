import express from 'express';
import articles from '../controllers/articles';
import { isLoggedIn } from '../middlewares/Authorization';
import { checkArticleInput, validateEditUserId,
  verifyUserIdExist, verifyBlogIdExist,
  blogTitleExist } from '../middlewares/Validation';

const {
  create, deleteArticle, editArticle, getAllArticles
} = articles;
const app = express.Router();

app.route('/')
  .post(
    isLoggedIn, checkArticleInput,
    blogTitleExist, verifyUserIdExist, create
  )
  .get(isLoggedIn, getAllArticles);

app.route('/delete/:blogId')
  .delete(isLoggedIn, verifyUserIdExist, verifyBlogIdExist, deleteArticle);

app.route('/edit/:blogId')
  .put(
    isLoggedIn, verifyUserIdExist, verifyBlogIdExist,
    blogTitleExist, validateEditUserId, editArticle
  );


export default app;
