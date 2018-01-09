import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import omit from 'lodash/omit';
import db from '../models';

dotenv.load();
const secret = process.env.secretkey;

const { User } = db;
export default {
  signUp(req, res) {
    return User.create(req.userInput)
      .then((activeUser) => {
        if (activeUser) {
          const currentUser = omit(
            activeUser.dataValues,
            ['password', 'createdAt', 'updatedAt']
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
  }
};
