import express from 'express';
import articles from '../controllers/articles';
import { isLoggedIn, isAdmin } from '../middlewares/Authorization';
import { checkArticleInput,
  verifyUserIdExist, verifyBlogIdExist,
  blogTitleExist,
  checkInvalidUser, } from '../middlewares/Validation';

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
  .delete(
    isLoggedIn, verifyUserIdExist, verifyBlogIdExist, checkInvalidUser,
    deleteArticle
  );

app.route('/edit/:blogId')
  .put(
    isLoggedIn, verifyUserIdExist, verifyBlogIdExist,
    checkInvalidUser, editArticle
  );

app.route('/admin/delete/:blogId')
  .delete(isLoggedIn, isAdmin, verifyBlogIdExist, deleteArticle);

app.route('/admin/edit/:blogId')
  .put(
    isLoggedIn, isAdmin, verifyBlogIdExist,
    blogTitleExist, editArticle
  );

export default app;
