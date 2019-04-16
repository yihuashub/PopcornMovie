import { projectConstants } from '../constants';
import {CALL_API} from "../middleware/YihuaApi";
import {Schemas} from "../middleware/schemas";

// Final my api25
export const loadProject = (id) => (dispatch, getState) => {
    const {
        nextPageUrl = `/projects/${id}` ,
    } = getState().pagination.projectByTag[id] || {}

    return dispatch(fetchProject(id,nextPageUrl))
}

const fetchProject = (id,nextPageUrl,) => ({
    id,
    [CALL_API]: {
        types: [ projectConstants.PROJECT_REQUEST, projectConstants.PROJECT_SUCCESS, projectConstants.PROJECT_FAILURE ],
        endpoint: nextPageUrl,
        method:'GET',
        schema: Schemas.PROJECT_ARRAY
    }
})

export const loadProjects = (tag,offset) => (dispatch, getState) => {
    const {
        nextPageUrl = (tag === 'all') ? `projects?limit=10&offset=${offset}` : `projects?tag=${tag}&limit=10&offset=${offset}` ,
    } = getState().pagination.postsByTag[tag] || {}

    return dispatch(fetchProjects(tag,offset,nextPageUrl))
}

const fetchProjects = (tag,offset,nextPageUrl) => ({
    tag,
    offset,
    [CALL_API]: {
        types: [ projectConstants.PROJECTS_REQUEST, projectConstants.PROJECTS_SUCCESS, projectConstants.PROJECTS_FAILURE ],
        endpoint: nextPageUrl,
        method:'GET',
        schema: Schemas.PROJECTS_ARRAY
    }
})

export const loadProjectTags = () => (dispatch, getState) => {
    const {
        nextPageUrl = `tags/project`,
    } = getState()

    return dispatch(fetchTag(nextPageUrl))
}

const fetchTag = (nextPageUrl,) => ({
    [CALL_API]: {
        types: [ projectConstants.TAG_REQUEST, projectConstants.TAG_SUCCESS, projectConstants.TAG_FAILURE ],
        endpoint: nextPageUrl,
        method:'GET',
        schema: Schemas.TAG_ARRAY
    }
})

export const selectProjectsTag =(tag) => {
    return {
        type: projectConstants.SELECT_PROJECT_TAG,
        tag
    }
}

export const selectProjectsOffset =(offset) => {
    return {
        type: projectConstants.SELECT_PROJECT_OFFSET,
        offset
    }
}

export const projectActions = {
    loadProject,
    loadProjects,
    loadProjectTags,
    selectProjectsTag,
    selectProjectsOffset
};
