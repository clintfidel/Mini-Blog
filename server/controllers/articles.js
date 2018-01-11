import dotenv from 'dotenv';
// import omit from 'lodash/omit'
import db from '../models';


dotenv.load();

const { Blog } = db;

const BlogController = {
  create(req, res) {
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
      })
      .catch(() => {
        res.status(500).json({
          message: 'Internal server error'
        });
      });
  },

  deleteArticle(req, res) {
    const { id } = req.decoded.currentUser;
    Blog
      .findById(req.params.blogId)
      .then((currentBlog) => {
        if (currentBlog.userId !== parseInt(id, 10)) {
          return res.status(403).send({
            message: 'sorry! you can only delete your own recipe'
          });
        }
        return Blog
          .destroy({
            where: {
              id: req.params.blogId,
              userId: id
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
          });
      })
      .catch(() => {
        res.status(500).send('Internal sever Error');
      });
  },

  editArticle(req, res) {
    const { id } = req.decoded.currentUser;
    Blog
      .findById(+req.params.blogId)
      .then((currentBlog) => {
        if (currentBlog.userId !== parseInt(id, 10)) {
          return res.status(403).send({
            message: 'sorry! you can only edit your own recipe'
          });
        }
        return Blog
          .update(req.body, {
            where: {
              id: +req.params.blogId,
              userId: id
            }
          })
          .then((edit) => {
            if (!edit) {
              res.status(404).send({
                message: 'No Blog found for edit'
              });
            }

            return res.status(200).json({
              message: 'Blog sucessfully updated',
              data: {
                blogTitle: req.body.blogTitle,
                blogPost: req.body.blogPost,
                rate: req.body.rate,
                blogId: req.params.blogId,
                userId: id
              }
            });
          });
      })
      .catch(() => {
        res.status(500).send('Internal sever Error');
      });
  },

};

export default BlogController;
