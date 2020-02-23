import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

var middlewares = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (__DEV__) {
  middlewares = [...middlewares, logger];
}

const store = createStore(
  reducer(),
  composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);

export default store;
