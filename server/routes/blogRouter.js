import express from 'express';
import Blog from '../controllers/BlogController';
import { isLoggedIn, isAdmin } from '../middlewares/Authorization';
import { checkArticleInput,
  verifyUserIdExist, verifyBlogIdExist,
  blogTitleExist,
  checkInvalidUser, checkReviewsInput,
  reviewExist
} from '../middlewares/Validation';

const {
  create, deleteArticle, editArticle, reviewArticles,
  getAllArticlesByPage, rateArticles, viewArticles, getOneArticle
} = Blog;

const blogRouter = express.Router();

blogRouter.route('/')
  .post(
    isLoggedIn, checkArticleInput,
    blogTitleExist, verifyUserIdExist, create
  )
  .get(isLoggedIn, getAllArticlesByPage);

blogRouter.route('/delete/:blogId')
  .delete(
    isLoggedIn, verifyUserIdExist, verifyBlogIdExist, checkInvalidUser,
    deleteArticle
  );

blogRouter.route('/edit/:blogId')
  .put(
    isLoggedIn, verifyUserIdExist, verifyBlogIdExist,
    checkInvalidUser, editArticle
  );

blogRouter.route('/admin/delete/:blogId')
  .delete(isLoggedIn, isAdmin, verifyBlogIdExist, deleteArticle);

blogRouter.route('/admin/edit/:blogId')
  .put(
    isLoggedIn, isAdmin, verifyBlogIdExist,
    blogTitleExist, editArticle
  );

blogRouter.route('/review/:blogId')
  .post(
    isLoggedIn, verifyBlogIdExist, verifyUserIdExist, reviewExist,
    checkReviewsInput, reviewArticles
  );

blogRouter.route('/:blogId')
  .get(getOneArticle);

blogRouter.route('/rate/:blogId')
  .post(isLoggedIn, verifyBlogIdExist, verifyUserIdExist, rateArticles);

blogRouter.route('/views/:blogId')
  .post(isLoggedIn, verifyBlogIdExist, verifyUserIdExist, viewArticles);

export default blogRouter;
