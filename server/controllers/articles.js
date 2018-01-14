import dotenv from 'dotenv';
import omit from 'lodash/omit';
import db from '../models';
import { createRate } from '../middlewares/Validation';


dotenv.load();

const { Blog, Review, Rate } = db;

const BlogController = {
  create(req, res) {
    Blog
      .findOne({
        where: {
          id: req.params.blogId
        }
      })
      .then((blog) => {
        if (!blog) {
          Blog.create(req.blogInput)
            .then((result) => {
              res.status(200).json({
                message: 'Blog successfully created!',
                data: {
                  blogTitle: result.blogTitle,
                  blogId: result.id,
                  userId: result.userId
                }
              });
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          message: 'Internal server error'
        });
      });
  },

  deleteArticle(req, res) {
    Blog
      .destroy({
        where: {
          id: +req.params.blogId
        }
      })
      .then((blog) => {
        if (blog) {
          return res.status(200).send({
            message: 'Blog deleted successfully'
          });
        }
        return res.status(404).send({
          message: 'No blog found ...'
        });
      })
      .catch(() => {
        res.status(500).send('Internal server Error');
      });
  },

  editArticle(req, res) {
    Blog
      .findById(req.params.blogId)
      .then(() => {
        const omitValue = omit(req.body, ['userId', 'views']);
        Blog
          .update(omitValue, {
            where: {
              id: +req.params.blogId,
            },
            returning: true,
            plain: true
          })
          .then((edited) => {
            if (!edited) {
              res.status(404).send({
                message: 'No Blog found for edit'
              });
            }
            return res.status(200).json({
              message: 'Blog sucessfully updated',
              updatedBlog: {
                blogTitle: edited[1].dataValues.blogTitle,
                blogPost: edited[1].dataValues.blogPost,
                blogId: edited[1].dataValues.blogId,
                userId: req.decoded.currentUser.id
              }
            });
          });
      })
      .catch(() => {
        res.status(500).send('Internal sever Error');
      });
  },

  getAllArticlesByPage(req, res) {
    const pageNumber = Number(req.query.myPage);
    const limit = 10;
    let offset;
    let page;
    const message = 'Sorry no blog found for this page';
    if (pageNumber === 0) {
      offset = 0;
    } else if (pageNumber > 0) {
      page = pageNumber;
      offset = limit * (page - 1);
    } else {
      offset = 0;
    }
    Blog
      .findAndCountAll({
        order: [['views', req.query.order || 'ASC']],
        attributes: ['id', 'blogTitle', 'views'],
        include: [{
          model: db.User,
          attributes: ['username', 'email']
        }],
        limit,
        offset,
      })
      .then((blog) => {
        const pages = Math.ceil(blog.count / limit);
        if (!blog.count) {
          return res.status(404).send('No Blog found');
        } else if (pageNumber > pages) {
          return res.status(404).send(message);
        }
        return res.status(200).json({ blog, count: blog.count, pages });
      })
      .catch(() => {
        res.status(500).send('Internal sever Error');
      });
  },

  getAllArticles(req, res) {
    Blog
      .findAll({})
      .then((articles) => {
        if (!articles) {
          res.status(404).json({
            message: 'No article found!'
          });
        }
        res.status(200).json(articles);
      })
      .catch(() => res.status(500).send('Internal server Error'));
  },

  reviewArticles(req, res) {
    const { id } = req.decoded.currentUser;
    Review
      .findOne({
        where: {
          userId: id,
          blogId: req.params.blogId
        }
      })
      .then(() => {
        Review
          .create(req.reviewInput)
          .then((review) => {
            res.status(201).json({
              message: 'you have successfully reviewed this article',
              reviewData: {
                user: id,
                blogId: review.blogId,
                content: review.comments
              }
            });
          });
      })
      .catch(() => {
        res.status(500).send('Internal server Error');
      });
  },

  rateArticles(req, res) {
    const { id } = req.decoded.currentUser;
    if (req.body.rate > 5) {
      return res.status(403).json({
        message: 'pls rate article from 1-5'
      });
    } else if (req.body.rate === 0) {
      return res.status(200).json({
        message: ' you didnt rate this article'
      });
    }
    Rate
      .findOne({
        where: {
          $and: [{ userId: id }, { blogId: req.params.blogId }]
        }
      })
      .then((rates) => {
        if (!rates) {
          return Rate.create({
            userId: id,
            blogId: req.params.blogId,
            rate: req.body.rate
          })
            .then(() => {
              createRate(req.body.rate, res);
            });
        } else if (rates) {
          const { rate } = req.body;
          return Rate.update({ rate }, {
            where: {
              blogId: req.params.blogId
            }

          })
            .then(() => res.status(200).json({
              message: 'Thanks for your rating!'
            }));
        }
      })
      .catch(() => {
        res.status(500).send('Internal server Error');
      });
  },

  viewArticles(req, res) {
    Blog
      .findOne({
        where: {
          id: req.params.blogId
        }
      })
      .then((views) => {
        if (!views) {
          return res.status(404).json({
            message: 'no blog found'
          });
        }
        views.increment('views')
          .then(() => views.reload());
        return res.status(200).json({
          message: 'success you have viewed this article;',
          views
        });
      });
  }
};

export default BlogController;
