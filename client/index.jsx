import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import "./public/css/style.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap'
import './public/js/index';

import configureStore from './store/configureStore';
import Routes from './routes/index';

const store = configureStore();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
