import api from "../../api";
import secureApi from "../../api/secureApi";
export const SET_AUTH_USER = 'SET AUTH USER';
export const UNSET_AUTH_USER = 'UNSET AUTH USER';


export const registerUser = (userData) => {
    return async (dispatch) => {
//registering a user................... 
        const response = await api.post("/register", userData);
        console.log(response);
        const { token, user } = response.data;
        localStorage.setItem("store_app_token", token);

        dispatch({
            type: SET_AUTH_USER,
            payload: user
        })

    }

}

export const updateUser = (userData)=>{
    return async (dispatch,getState)=>{
        const current_state = getState();
        const {auth:{authUser:{_id}} }  = current_state;
      
        const response = await secureApi.patch(`/user/${_id}`, userData);
        console.log('response',response);
        const { user } = response.data;

        dispatch({
            type: SET_AUTH_USER,
            payload: user  
        })
    }
}

export const setAuthUser = (payload)=>{
    return {
        type: SET_AUTH_USER,
        payload
    }
}



export const unSetAuthUser = () => {
    return {
        type: UNSET_AUTH_USER,

    }

}