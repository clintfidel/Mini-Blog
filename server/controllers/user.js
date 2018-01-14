import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import omit from 'lodash/omit';
import db from '../models';

dotenv.load();
const secret = process.env.secretkey;

const { User } = db;
const UserController = {
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

  login(req, res) {
    User
      .findOne({
        where: { username: req.body.username }
      })
      .then((user) => {
        user
          .update({
            active: true

          }).then((result) => {
            const currentUser = omit(
              result.dataValues,
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
          });
      });
  },

  editProfile(req, res) {
    const { id } = req.decoded.currentUser;
    User
      .findOne({
        where: { id }
      })
      .then((edit) => {
        edit
          .update(req.body)
          .then((result) => {
            const currentUser = omit(
              result.dataValues,
              ['password', 'createdAt', 'updatedAt']
            );
            const token = jwt.sign(
              {
                currentUser,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
              },
              process.env.secretKey
            );
            return res.status(200).json({
              message: 'profile edited successfully!!!',
              token,
              data: {
                fullname: result.fullname,
                username: result.username,
                email: result.email,
                id: result.id
              }
            });
          })
          .catch(() => res.status(500).json({
            message: 'internal server error'
          }));
      });
  },

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
