import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const key = process.env.secretKey;

 /**
   * @description - Checks if logged in user has valid AUTH token
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {null} - null
   */
export const isLoggedIn = (req, res, next) => {
  let token;
  const tokenAvailable = req.headers.authorization ||
    req.headers['x-access-token'];
  if (req.headers.authorization) {
    [token] = req.headers.authorization.split(' ');
  } else {
    token = tokenAvailable;
  }
  if (token) {
    jwt.verify(token, key, (error, decoded) => {
      if (error) {
        res.status(401)
          .send({
            message: 'Failed to Authenticate Token',
            error
          });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401)
      .json({
        message: 'Access denied, Authentication token does not exist'
      });
  }
};

 /**
   * @description - Checks if logged in user is an authenticated Admin
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - contains status code and error message
   */
export const isAdmin = (req, res, next) => {
  const decodeToken = req.decoded;
  if (decodeToken.currentUser.isAdmin === 0 ||
typeof decodeToken.currentUser.isAdmin === 'undefined') {
    return res.status(403).send({
      message: 'you do not have permission to perform this operation'
    });
  } else if (decodeToken.currentUser.isAdmin === 1) {
    next();
  } else {
    res.status(403).send({
      status: false,
      message: 'you are not authorized to perform this operation '
    });
  }
};

