import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from '../reducers/index';

const logger = createLogger();


const middleware = (process.env.NODE_ENV === 'development') ?
  composeWithDevTools(applyMiddleware(thunk, logger)) : applyMiddleware(thunk);

  /* eslint-disable no-underscore-dangle */

/**
 *
 * @description - Redux store configuration
 *
 * @param {Object}  initialState - inistial state
 *
 * @returns {Object} - Object containing data in redux store
 */
const configureStore = (() => createStore(middleware));

export default configureStore;
/* eslint-enable */
