import { SET_ERROR, UNSET_ERROR, SET_LOADING, UNSET_LOADING,OPEN_SEARCH_DIV,CLOSE_SEARCH_DIV } from '../actions/errorAndLoading';

let initialState = {
    isErrorActive: false,
    errorMessage: "",
    isLoading: false,
    isSearchDivActive: false
}
const errorAndLoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                isErrorActive: true,
                errorMessage:action.message
            }
        case UNSET_ERROR:
            return {
                ...state,
                isErrorActive: false,
                errorMessage: ""
            }

        case SET_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case UNSET_LOADING:
            return {
                ...state,
                isLoading: false
            }

        case OPEN_SEARCH_DIV:
            return {
                ...state,
                isSearchDivActive: true
            }

        case CLOSE_SEARCH_DIV:
            return {
                ...state,
                isSearchDivActive: false
            }

        default:
            return state;
    }

}

export default errorAndLoadingReducer;