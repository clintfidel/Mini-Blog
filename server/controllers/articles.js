import dotenv from 'dotenv';
// import omit from 'lodash/omit'
import db from '../models';

dotenv.load();

const { Blog } = db;

export default {
  create(req, res) {
    Blog.create(req.blogInput)
      .then(() => res.status(200).json({
        message: 'Blog successfully created!'
      }))
      .catch(() => {
        res.status(500).json({
          message: 'Internal server error'
        });
      });
  }
};
