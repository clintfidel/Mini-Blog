import db from '../models';

const { Blog } = db;

const adminController = {
  adminDeleteArticle(req, res) {
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
        res.status(500).send('Internal sever Error');
      });
  },

  adminEditArticle(req, res) {
    const { id } = req.decoded.currentUser;
    Blog
      .update(req.body, {
        where: {
          id: +req.params.blogId,
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
      })

      .catch((error) => {
				console.log(error, '====>')
        res.status(500).send('Internal sever Error');
      });
  },
};

export default adminController;

