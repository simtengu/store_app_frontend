import { SET_ERROR, UNSET_ERROR, SET_LOADING, UNSET_LOADING, } from '../actions/errorAndLoading';

let initialState = {
    isErrorActive: false,
    errorMessage: "",
    isLoading: false
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

        default:
            return state;
    }

}

export default errorAndLoadingReducer;