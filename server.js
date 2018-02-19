import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import winston from 'winston';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import path from 'path';
import validator from 'express-validator';
import webpackConfig from './webpack.config.dev';
import BlogRoutes from './server/routes/blogRouter';
import UserRoutes from './server/routes/userRouter';

const app = express();

dotenv.config();

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());
app.use(express.static('./client/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/articles', BlogRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  winston.info(`Connected on port ${port}`);
});
