import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

// Extracts the next page URL from Github API response.
const getNextPageUrl = response => {
    const link = response.headers.get('link')
    if (!link) {
        return null
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
    if (!nextLink) {
        return null
    }

    return nextLink.trim().split(';')[0].slice(1, -1)
}

//const API_OLD_ROOT = 'https://api.github.com/'

const GITHUB_API_ROOT = 'https://api.github.com/'

//const API_ROOT = 'https://conduit.productionready.io/api/'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, schema) => {
    const fullUrl = (endpoint.indexOf(GITHUB_API_ROOT) === -1) ? GITHUB_API_ROOT + endpoint : endpoint

    return fetch(fullUrl)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }

                const camelizedJson = camelizeKeys(json)
                // const nextPageUrl = getNextPageUrl(response)

                console.log('came ' + JSON.stringify(camelizedJson));

                const result = normalize(camelizedJson, schema)

                if (typeof result.result === 'undefined') {
                    console.log("undefined")
                    return Object.assign({},
                        //normalize(camelizedJson, schema),
                        //console.log('what ???' + JSON.stringify(normalize(camelizedJson, schema)))
                        //  { nextPageUrl }
                        {entities:camelizedJson}
                    )
                }else{
                    return Object.assign({},
                        //normalize(camelizedJson, schema),
                        //console.log('what ???' + JSON.stringify(normalize(camelizedJson, schema)))
                        //  { nextPageUrl }
                        result
                    )
                }



            })
        )
}


// action key that carries API call info interpreted by this Redux middleware.
export const CALL_GITHUB_API = 'Call Github API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_GITHUB_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint } = callAPI
    const { schema, types } = callAPI

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (!schema) {
        throw new Error('Specify one of the exported Schemas.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_GITHUB_API]
        return finalAction
    }

    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType }))

    return callApi(endpoint, schema).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.errors.message || 'Something bad happened'
        }))
    )
}
