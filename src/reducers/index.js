import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { entities } from './entities.reducer';
import { selectedArticlesTag,selectedArticlesOffset } from './article.reducer';
import { selectedProjectsTag, selectedProjectsOffset } from './project.reducer';

import paginate from './paginate.reducer'
import { articleConstants,projectConstants,githubConstants } from '../constants';
// Updates the pagination data for different actions.
const pagination = combineReducers({
  postsByTag: paginate({
    mapActionToKey: action => action.tag,
    types: [
      articleConstants.ARTICLES_REQUEST,
      articleConstants.ARTICLES_SUCCESS,
      articleConstants.ARTICLES_FAILURE
    ],
  }),
  projectByTag: paginate({
    mapActionToKey: action => action.tag,
    types: [
      projectConstants.PROJECTS_REQUEST,
      projectConstants.PROJECTS_SUCCESS,
      projectConstants.PROJECTS_FAILURE
    ],
  }),
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      githubConstants.GITHUB_USER_REQUEST,
      githubConstants.GITHUB_USER_SUCCESS,
      githubConstants.GITHUB_USER_FAILURE
    ],
  }),
})

const rootReducer = combineReducers({
  alert,
  entities,
  pagination,
  selectedArticlesTag,
  selectedArticlesOffset,
  selectedProjectsTag,
  selectedProjectsOffset,
});

export default rootReducer;
