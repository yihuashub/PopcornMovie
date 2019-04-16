import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/'

import yihuaApi from '../middleware/YihuaApi'
import githubApi from "../middleware/GithubApi";

const middlewares = [yihuaApi, githubApi]


const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
    applyMiddleware(thunk, ...middlewares),
)

export default configureStore
