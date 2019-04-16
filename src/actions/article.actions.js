import {articleConstants, userConstants} from '../constants';
import {CALL_API} from "../middleware/YihuaApi";
import {Schemas} from "../middleware/schemas";
import {alertActions} from "./alert.actions";

export const loadArticle = (id) => (dispatch, getState) => {
    const {
        nextPageUrl = `/articles/${id}` ,
    } = getState().pagination.postsByTag[id] || {}

    return dispatch(fetchArticle(id,nextPageUrl))
}

const fetchArticle = (id,nextPageUrl,) => ({
    id,
    [CALL_API]: {
        types: [ articleConstants.ARTICLE_REQUEST, articleConstants.ARTICLE_SUCCESS, articleConstants.ARTICLE_FAILURE ],
        endpoint: nextPageUrl,
        method:'GET',
        schema: Schemas.ARTICLE_ARRAY
    }
})

export const loadArticles = (tag,offset) => (dispatch, getState) => {
    const {
        nextPageUrl = (tag === 'all') ? `articles?limit=10&offset=${offset}` : `articles?tag=${tag}&limit=10&offset=${offset}` ,
    } = getState().pagination.postsByTag[tag] || {}

    return dispatch(fetchArticles(tag,offset,nextPageUrl))
}

const fetchArticles = (tag,offset,nextPageUrl) => ({
    tag,
    offset,
    [CALL_API]: {
        types: [ articleConstants.ARTICLES_REQUEST, articleConstants.ARTICLES_SUCCESS, articleConstants.ARTICLES_FAILURE ],
        endpoint: nextPageUrl,
        method:'GET',
        schema: Schemas.ARTICLES_ARRAY
    }
})

export const loadArticleTags = () => (dispatch, getState) => {
    const {
        nextPageUrl = `tags/article`,
    } = getState()

    return dispatch(fetchTag(nextPageUrl))
}

const fetchTag = (nextPageUrl,) => ({
    [CALL_API]: {
        types: [ articleConstants.TAG_REQUEST, articleConstants.TAG_SUCCESS, articleConstants.TAG_FAILURE ],
        endpoint: nextPageUrl,
        method:'GET',
        schema: Schemas.TAG_ARRAY
    }
})

export const selectArticlesTag =(tag) => {
    return {
        type: articleConstants.SELECT_ARTICLE_TAG,
        tag
    }
}

export const selectArticlesOffset =(offset) => {
    return {
        type: articleConstants.SELECT_ARTICLE_OFFSET,
        offset
    }
}

export const articleActions = {
    loadArticle,
    loadArticles,
    loadArticleTags,
    selectArticlesTag,
    selectArticlesOffset
};
