import express from 'express';
import articles from '../controllers/articles';
import adminAction from '../controllers/admin';
import { isLoggedIn, isAdmin } from '../middlewares/Authorization';
import { checkArticleInput, validateEditUserId,
  verifyUserIdExist, verifyBlogIdExist,
  blogTitleExist, verifyBlogIdParams } from '../middlewares/Validation';

const {
  create, deleteArticle, editArticle, getAllArticles
} = articles;
const { adminDeleteArticle, adminEditArticle } = adminAction;
const app = express.Router();

app.route('/')
  .post(
    isLoggedIn, checkArticleInput,
    blogTitleExist, verifyUserIdExist, create
  )
  .get(isLoggedIn, getAllArticles);

app.route('/delete/:blogId')
  .delete(
    isLoggedIn, verifyBlogIdParams, verifyUserIdExist, verifyBlogIdExist,
    deleteArticle
  );

app.route('/edit/:blogId')
  .put(
    isLoggedIn, verifyUserIdExist, verifyBlogIdExist,
    verifyBlogIdParams, blogTitleExist, validateEditUserId, editArticle
  );

app.route('/admin/delete/:blogId')
  .delete(
    isLoggedIn, isAdmin, verifyBlogIdExist,
    verifyBlogIdParams, adminDeleteArticle
  );

app.route('/admin/edit/:blogId')
  .put(
    isLoggedIn, isAdmin, verifyBlogIdExist, verifyBlogIdParams,
    validateEditUserId, blogTitleExist, adminEditArticle
  );

export default app;
