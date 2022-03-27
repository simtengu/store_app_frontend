import { combineReducers } from 'redux';
import authReducer from './auth';
import authFormReducer from "./authForms"
import errorAndLoadingReducer from "./errorAndLoading"
import productsReducer from "./products"

const rootReducer = combineReducers({ auth: authReducer, authForm: authFormReducer, errorAndLoading: errorAndLoadingReducer, products: productsReducer });
export default rootReducer;