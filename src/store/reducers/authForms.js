import { ACTIVATE_LOGIN_FORM, ACTIVATE_REGISTER_FORM } from '../actions/authForms';
let initialState = {
    activeForm: 'login'
}
const authFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVATE_LOGIN_FORM:
            return {
                activeForm: 'login'
            }
        case ACTIVATE_REGISTER_FORM:
            return {
                activeForm: 'register'
            }

        default:
            return state;
    }

}

export default authFormReducer;