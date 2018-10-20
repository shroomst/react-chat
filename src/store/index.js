import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import history from '../utils/history';
import rootReducer from '../reducers';

export default function configureStore() {
  if (process.env.NODE_ENV === 'production') {
    return createStore (
      connectRouter(history)(rootReducer),
      applyMiddleware (
        routerMiddleware(history),
        thunkMiddleware
      )
    )
  } else {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true })
      : compose;

    const store = createStore (
      connectRouter(history)(rootReducer),
      composeEnhancers (
        applyMiddleware (
          routerMiddleware(history),
          thunkMiddleware,
          loggerMiddleware
        )
      )
    );

    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer)
      })
    }
    return store;
  }
}
