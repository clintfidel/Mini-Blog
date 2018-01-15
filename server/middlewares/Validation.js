import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import omit from 'lodash/omit';
import database from '../models/';

dotenv.config();

const {
  User, Blog, Review
} = database;

/**
   * @description - Checks that a user signs in with right details
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const checkUserInput = (req, res, next) => {
  const userNameError = 'Please provide a username with atleast 5 characters.';
  req.checkBody({
    username: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5 }],
        errorMessage: userNameError
      },
      errorMessage: 'Your Username is required'
    },
    email: {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Provide a valid a Email Adrress'
      },
      errorMessage: 'Your Email Address is required'
    },
    fullname: {
      notEmpty: true,
      errorMessage: 'Your Fullname is required'
    },
    password: {
      notEmpty: true,
      isLength: {
        options: [{ min: 8 }],
        errorMessage: 'Provide a valid password with minimum of 8 characters'
      },
      errorMessage: 'Your Password is required'
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        error: error.msg
      });
    });
    return res.status(409)
      .json(allErrors);
  }

  const password = bcrypt.hashSync(req.body.password, 10); // encrypt password
  req.userInput = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    password
  };
  next();
};

/**
   * @description - Checks that a user adds article with right details
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const checkArticleInput = (req, res, next) => {
  const lengthError = 'Please provide a title with atleast 5 characters.';
  req.checkBody({
    blogTitle: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5 }],
        errorMessage: lengthError
      },
      errorMessage: 'Your Blog title is required'
    },
    blogPost: {
      notEmpty: true,
      errorMessage: 'Please add the content of your blog'
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        error: error.msg
      });
    });
    return res.status(409)
      .json(allErrors);
  }
  req.blogInput = {
    blogTitle: req.body.blogTitle,
    instructions: req.body.instructions,
    blogPost: req.body.blogPost,
    views: req.body.views,
    userId: req.decoded.currentUser.id
  };
  next();
};

/**
   * @description - Checks that a user reviews with right details
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const checkReviewsInput = (req, res, next) => {
  const lengthError = 'Please add words of at least 5 characters long.';
  req.checkBody({
    comments: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5 }],
        errorMessage: lengthError
      },
      errorMessage: 'Your comment is required'
    },
  });
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        error: error.msg
      });
    });
    return res.status(409)
      .json(allErrors);
  }
  req.reviewInput = {
    userId: req.decoded.currentUser.id,
    comments: req.body.comments,
    blogId: req.params.blogId
  };
  next();
};

/**
   * @description - Checks that a user can't sign in with same username
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const isSignedUpWithUsername = (req, res, next) => {
  User
    .findOne({
      where: {
        username: req.body.username
      }
    })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          error: 'username already exist'
        });
      }
      next();
    });
};

/**
   * @description - Checks that a user can't sign in with same email
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const isSignedUpWithEmail = (req, res, next) => {
  User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          error: 'email already exist '
        });
      }
      next();
    });
};

/**
   * @description - checks that a user is logged in with right details
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   *
   * @return {object} - status code and error message
   */
export const validateLogin = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400)
      .json({
        message: 'Please provide your username or password to login'
      });
  }
};

/**
   * @description - validates User input
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const validateEdituser = (req, res, next) => {
  const userNameError = 'Please provide a username with atleast 5 characters.';
  req.checkBody({
    fullname: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5 }],
        errorMessage: userNameError
      },
      errorMessage: 'Your fullname is required'
    },
  });
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        error: error.msg
      });
    });
    return res.status(409)
      .json(allErrors);
  }
  const { id } = req.decoded.currentUser;
  User.findOne({
    where: {
      id
    }
  })
    .then((user) => {
      if (user.fullname === req.body.fullname) {
        res.status(403).send({
          message: 'fullname already exist'
        });
      } else if (req.body.password) {
        res.status(403).send({
          mesage: 'you cannot edit your password'
        });
      } else {
        next();
      }
    })
    .catch(() => {
      res.status(500).send('Internal server Error');
    });
};

/**
   * @description - verifies that userId can't be edited
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const validateEditUserId = (req, res, next) => {
  const { id } = req.decoded.currentUser;
  Blog
    .findById(id)
    .then(() => {
      if (req.body.userId) {
        return res.status(403).send({
          mesage: 'you cannot edit userId'
        });
      } else if (req.body.userId === 'undefined') {
        next();
      }
      next();
    })
    .catch(() => res.status(500).send('Internal server Error'));
};

/**
   * @description - Checks that a user is a valid user
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const checkInvalidUser = (req, res, next) => {
  const { id } = req.decoded.currentUser;
  Blog
    .findById(req.params.blogId)
    .then((currentBlog) => {
      if (currentBlog.userId !== parseInt(id, 10)) {
        return res.status(403).send({
          message: 'Invalid User! you can only make changes to your own Blog'
        });
      }
      next();
    });
};

/**
   * @description - Checks if UserId exist in database
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const verifyUserIdExist = (req, res, next) => {
  const { id } = req.decoded.currentUser;
  User
    .findOne({
      where: {
        id
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'No user with that Id found!'
        });
      }
      next();
    })
    .catch(error => res.status(404).send(error.errors));
};

/**
   * @description - Checks if params input is valid
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const verifyBlogIdExist = (req, res, next) => {
  if (req.params.blogId.match(/^[0-9]/) === null
  || !req.params.blogId) {
    return res.status(400).json({
      status: false,
      message: 'Unidentified Blog! pls include a valid blogId'
    });
  }
  return Blog
    .findById(req.params.blogId)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: 'No Blog with that Id found'
        });
      }
      next();
    })
    .catch(error => res.status(404).send(error.errors));
};

/**
   * @description - Checks if a blogTitle exist in the database
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const blogTitleExist = (req, res, next) => {
  Blog
    .findOne({
      where: {
        blogTitle: req.body.blogTitle
      }
    })
    .then((blog) => {
      if (blog) {
        return res.status(409).json({
          error: 'Blog already exist'
        });
      }
      next();
    });
};

/**
   * @description - Checks if a user has reviewed a blog
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const reviewExist = (req, res, next) => {
  const { id } = req.decoded.currentUser;
  Review
    .findOne({
      where: {
        $and: [{ blogId: req.params.blogId },
          { userId: id }]
      }
    })
    .then((review) => {
      if (review) {
        return res.status(403).send({
          message: 'you cannot perform this operation more than once'
        });
      }
      next();
    })
    .catch(() => res.status(500).send('Internal server Error'));
};

/**
   * @description - gets users rating
   *
   * @param  {Object} rate - request
   *
   * @param  {object} res - response
   *
   * @return {object} - status code and user rating
   */
export const createRate = (rate, res) => {
  const result = ['Bad', 'Satisfactory', 'Good', 'Very Good', 'Great'];
  res.status(200).json({
    message: `you rated this article ${result[rate - 1]}`
  });
};

/**
   * @description - Checks if params input is valid
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const validBlogIdParams = (req, res, next) => {
  const errorMessage = 'pls input a valid id! Numbers expected';
  if (req.params.blogId && req.params.blogId !== 'number') {
    return res.status(401).json({
      message: errorMessage
    });
  } else if (!req.params.blogId) {
    return res.status(401).json({
      message: errorMessage
    });
  }
  next();
};
