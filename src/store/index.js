import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/index'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const storeCreator = initialState => {
  return createStore(rootReducer, initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      ...(process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__
        ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
        : [])
    ))
}

const store = storeCreator()

sagaMiddleware.run(rootSaga)

export default store
