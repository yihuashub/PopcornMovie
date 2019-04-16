import { projectConstants } from '../constants';

export const selectedProjectsOffset = (state = 0, action) => {
    const { type } = action

    if (type === projectConstants.SELECT_PROJECT_OFFSET) {
        return action.offset
    }
    return state
}

export const selectedProjectsTag = (state = 'all', action) => {
    const { type } = action

    if (type === projectConstants.SELECT_PROJECT_TAG) {
        return action.tag
    }
    return state
}
