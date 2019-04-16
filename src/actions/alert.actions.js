import { alertConstants } from '../constants';



const success = (message) => {
    return { type: alertConstants.SUCCESS, message };
}

const warning = (message) => {
    return { type: alertConstants.WARNING, message };
}

const info = (message) => {
    return { type: alertConstants.INFO, message };
}

const error = (message) => {
    return { type: alertConstants.ERROR, message };
}

const clear = () => {
    return { type: alertConstants.CLEAR };
}

export const alertActions = {
    success,
    warning,
    error,
    info,
    clear
};
