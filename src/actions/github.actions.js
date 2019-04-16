import {CALL_GITHUB_API} from "../middleware/GithubApi";
import {Schemas} from "../middleware/schemas";
import {githubConstants} from "../constants";

export const loadUser = (login, requiredFields) => (dispatch, getState) => {
    const user = getState().entities.users[login]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
        return null
    }

    return dispatch(fetchUser(login))
}

const fetchUser = (login) => ({
    login,
    [CALL_GITHUB_API]: {
        types: [ githubConstants.GITHUB_USER_REQUEST, githubConstants.GITHUB_USER_SUCCESS, githubConstants.GITHUB_USER_FAILURE ],
        endpoint: `users/${login}`,
        schema: Schemas.USER
    }
})

export const githubActions = {
    loadUser,
};
