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

};

export default adminController;

