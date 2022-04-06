export const SET_LOADING = 'SET_LOADING';
export const UNSET_LOADING = 'UNSET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const UNSET_ERROR = 'UNSET_ERROR';
export const OPEN_SEARCH_DIV = 'OPEN_SEARCH_DIV';
export const CLOSE_SEARCH_DIV = 'CLOSE_SEARCH_DIV';

export const activateLoading = ()=>{
    return {
        type: SET_LOADING
    }
}

export const deactivateLoading = ()=>{
    return {
        type: UNSET_LOADING
    }
}

export const activateError = (msg) => {
    return {
        type: SET_ERROR,
        message: msg
    }
}

export const deactivateError = () => {
    return {
        type: UNSET_ERROR
    }
}

export const openSearchDiv = () => {
    return {
        type: OPEN_SEARCH_DIV
    }
}

export const closeSearchDiv = () => {
    return {
        type: CLOSE_SEARCH_DIV
    }
}