import { createStore, applyMiddleware, compose } from 'redux';
import middlewareThunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [middlewareThunk];

if (process.env.ENVIRONMENT === `development`) {
  // const { logger } = require(`redux-logger`);
  // middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);

export default store;
