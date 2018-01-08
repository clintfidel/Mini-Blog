import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import winston from 'winston';
import validator from 'express-validator';
import BlogRoutes from './server/routes/recipe';
import UserRoutes from './server/routes/user';

const app = express();

dotenv.load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/recipes', BlogRoutes);

app.get('*', (req, res) => {
  res.send('welcome to My Blog App')
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  winston.info(`Connected on port ${port}`);
});