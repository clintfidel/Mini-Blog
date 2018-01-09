import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import winston from 'winston';
import db from '../models/';

dotenv.config();

const { User } = db;

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

export const validateLogin = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400)
      .json({
        message: 'Please provide your username or password to login'
      });
  }
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user) => {
      if (user &&
          bcrypt.compareSync(req.body.password, user.password)) {
        next();
      } else {
        return res.status(401)
          .json({
            ' message': 'Invalid Credentials.'
          });
      }
    })
    .catch(error => res.status(401).send({
      error,
      message: 'invalid details passed'
    }));
};

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

