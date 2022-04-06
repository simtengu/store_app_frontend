import { combineReducers } from 'redux';
import authReducer from './auth';
import authFormReducer from "./authForms"
import errorAndLoadingReducer from "./errorAndLoading"
import productsReducer from "./products"
import cartReducer from "./cart"

const rootReducer = combineReducers({ auth: authReducer, authForm: authFormReducer,
     errorAndLoading: errorAndLoadingReducer, products: productsReducer,cart:cartReducer });
export default rootReducer;