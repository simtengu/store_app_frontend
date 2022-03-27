import {SET_AUTH_USER,UNSET_AUTH_USER} from '../actions/auth';
let initialState = {
    authUser: null,
}
const authReducer = (state = initialState,action)=>{
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                authUser: action.payload
            }
        case UNSET_AUTH_USER:
            return {
                authUser: null
            }
        default:
            return state;
    }

}

export default authReducer;