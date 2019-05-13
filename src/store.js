import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import { helloSaga } from './sagas'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const sagaMiddleware = createSagaMiddleware()
let store =  createStore(
  connectRouter(history)(rootReducer),
  initialState,
  applyMiddleware(sagaMiddleware),
  composedEnhancers
)
sagaMiddleware.run(helloSaga)

const action = type => store.dispatch({type})

export default store