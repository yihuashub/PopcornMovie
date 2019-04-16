import { articleConstants } from '../constants';

export const selectedArticlesOffset = (state = 0, action) => {
    const { type } = action

    if (type === articleConstants.SELECT_ARTICLE_OFFSET) {
        return action.offset
    }
    return state
}

export const selectedArticlesTag = (state = 'all', action) => {
    const { type } = action

    if (type === articleConstants.SELECT_ARTICLE_TAG) {
        return action.tag
    }
    return state
}
