import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'

const superagent = require('superagent');
const API_ROOT = 'https://api.yihua.ca/api/'

//const API_ROOT = 'https://conduit.productionready.io/api/'


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, schema, method, parameter, token) => {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
    const tokenPlugin = req => {
        if (token) {
            req.set('authorization', `Token ${token}`);
        }
    }

    if (method === 'GET') {
        return superagent.get(fullUrl)
            .use(tokenPlugin)
            .type('json')
            .then(response => {
                return handleBody(response,schema);
            }).catch((error) => {
                return Promise.reject(error.response.body)
            })
    } else if (method === 'POST') {
        return superagent.post(fullUrl)
            .use(tokenPlugin)
            .set('Content-Type', 'application/json')
            .send(parameter)
            .type('json')
            .then(response => {
                return handleBody(response, schema);
            }).catch((error) => {
                return Promise.reject(error.response.body)
            })
    } else if (method === 'PUT') {
        return superagent.put(fullUrl)
            .use(tokenPlugin)
            .set('Content-Type', 'application/json')
            .send(parameter)
            .type('json')
            .then(response => {
                return handleBody(response,schema);
            }).catch((error) => {
                return Promise.reject(error.response.body)
            })
    }else {
        const errors = {errors: {error: {message: "no method"}}}
        return Promise.reject(errors)
    }
}

const handleBody = ( response, schema ) =>{
    const camelizedJson = camelizeKeys(response.body)
    const result = normalize(camelizedJson, schema)

    if (typeof result.result === 'undefined') {
        console.log("undefined")
        return Object.assign({},
            {entities: camelizedJson}
        )
    } else {
        return Object.assign({},
            result
        )
    }
}

export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {endpoint} = callAPI
    const token = window.localStorage.getItem('jwt');
    const {schema, method, parameter, auth, types} = callAPI

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }
    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (typeof method !== 'string') {
        throw new Error('Specify a string request method.')
    }
    if (auth && !token) {
        throw new Error('Cannot find token in local.')
    }
    if (method === 'POST' && !typeof(parameter !== 'object')) {
        throw new Error('Parameter can not be null during POST')
    }
    if (method === 'PUT' && !typeof(parameter !== 'object')) {
        throw new Error('Parameter can not be null during PUT')
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
        delete finalAction[CALL_API]
        return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({type: requestType}))

    return callApi(endpoint, schema, method, parameter, token).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(
            actionWith(
            {
            type: failureType,
            error: Object.keys(error.errors)[0] + ": "+ error.errors[Object.keys(error.errors)[0]] || 'Something bad happened'
        }))
    )
}
