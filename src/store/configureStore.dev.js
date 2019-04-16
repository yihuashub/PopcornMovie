import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import YihuaApi from '../middleware/YihuaApi'
import GithubApi from '../middleware/GithubApi'

import rootReducer from '../reducers/'
import DevTools from '../views/DevTools'

const configureStore = preloadedState => {
  const middlewares = [YihuaApi, GithubApi]
  const store = createStore(rootReducer, preloadedState,composeWithDevTools(
       applyMiddleware(thunk, ...middlewares, createLogger()),
      // other store enhancers if any
  ));
  return store;
}

// const configureStore = preloadedState => {
//   const middlewares = [yihuaApi, githubApi]
//
//   const store = createStore(
//     rootReducer,
//     preloadedState,
//
//   compose(
//       applyMiddleware(thunk, ...middlewares, createLogger()),
//       DevTools.instrument()
//     )
//   )
//
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       store.replaceReducer(rootReducer)
//     })
//   }
//
//   return store
// }

export default configureStore
