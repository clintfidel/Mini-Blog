import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// import './public/js/index';
import 'bootstrap/dist/js/bootstrap'; // for responsive navbar dropdown and modal dialog
import 'bootstrap/dist/css/bootstrap.css';
// import './public/css/style.css'

import configureStore from './store/configureStore';
import Routes from './routes/index';

const store = configureStore();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
