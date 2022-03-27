export const ACTIVATE_LOGIN_FORM = 'ACTIVATE_LOGIN_FORM';
export const ACTIVATE_REGISTER_FORM = 'ACTIVATE_REGISTER_FORM';

export const activate_login_form = ()=>{
    return {
        type: ACTIVATE_LOGIN_FORM
    }
}

export const activate_register_form = () => {
    return {
        type: ACTIVATE_REGISTER_FORM
    }
}