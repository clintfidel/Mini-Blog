import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import omit from 'lodash/omit';
import database from '../models';

dotenv.load();
const secret = process.env.secretkey;

const { User } = database;
const UserController = {
  /**
   * @description - Adds a new user to the database
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - Object containing user detail in form of token
   *
   * Route: POST: /users/signup
   */
  signUp(req, res) {
    return User.create(req.userInput)
      .then((activeUser) => {
        if (activeUser) {
          const currentUser = omit(
            activeUser.dataValues,
            ['isAdmin', 'password', 'createdAt', 'updatedAt']
          );
          const expiresIn = { exp: Math.floor(Date.now() / 1000) + (60 * 60) };
          const token = jwt.sign(
            { currentUser, expiresIn },
            process.env.secretKey
          );

          return res.status(201).send({
            message: 'Signed up successfully',
            token
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          status: false,
          message: 'Internal server Error'

        });
      });
  },

  /**
   * @description - logs a user in with authenticated details
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - Object containing user detail in token form
   *
   * Route: POST: /users/signin
   */
  login(req, res) {
    User
      .findOne({
        where: { username: req.body.username }
      })

      .then((user) => {
        if (user &&
          bcrypt.compareSync(req.body.password, user.password)) {
          const currentUser = omit(
            user.dataValues,
            ['password', 'createdAt', 'updatedAt']
          );
          const expireIn = { exp: Math.floor(Date.now() / 1000) + (60 * 60) };
          const token = jwt.sign(
            { expireIn, currentUser },
            process.env.secretKey
          );
          res.status(200)
            .json({
              message: 'Logged In Successfully',
              token
            });
        } else {
          return res.status(401)
            .json({
              ' message': 'Invalid Credentials.'
            });
        }
      })
      .catch(() => res.status(500).json('Internal server error'));
  },

  /**
   * @description - User edit profile
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - success message and user updated profile
   *
   * Route: POST: /users/edit/:userId
   */
  editProfile(req, res) {
    const { id } = req.decoded.currentUser;
    User
      .findOne({
        where: { id }
      })
      .then((edit) => {
        const omitValue =
        omit(req.body, ['isAdmin', 'password', 'createdAt', 'updatedAt']);
        edit
          .update(omitValue);
        const token = jwt.sign(
          {
            omitValue,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
          },
          process.env.secretKey
        );
        return res.status(200).json({
          message: 'profile edited successfully!!!',
          token,
          data: {
            fullname: edit.fullname,
            username: edit.username,
            email: edit.email,
            id: edit.id
          }
        })
          .catch(() => res.status(500).json({
            message: 'internal server error'
          }));
      });
  },

  /**
   * @description - Admin gets all user in database
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - Object containing a list of all users
   *
   * Route: POST: /users/signup
   */
  getAllUsers(req, res) {
    User.findAll({})
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'no user found'
          });
        }
        return res.status(200).send(user);
      })
      .catch(() => res.status(500).json({
        message: 'Internal server Error!'
      }));
  }
};

export default UserController;
