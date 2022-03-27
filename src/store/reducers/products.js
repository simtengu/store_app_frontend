import { ADD_PRODUCT,SET_FILTERED_PRODUCTS, SET_PRODUCTS, SET_SYSTEM_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT, SET_SELECTED_PRODUCT } from "../actions/products";

let initialState = {
    products: [],
    systemProducts: [],
    selectedProduct: {},
    filteredProducts:{
        products:[],
        category:{
            name:"",
            value:"Latest First"
        }
    }
}
const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SYSTEM_PRODUCTS:
            return {
                ...state,
                systemProducts: action.payload
            }

        case ADD_PRODUCT:
            const newProductArray = [action.payload];
            let newList = state.systemProducts.concat(newProductArray)
            return {
                ...state,
                systemProducts: newList
            }
        case UPDATE_PRODUCT:
            const productIndex = state.systemProducts.findIndex(product => product._id === action.payload.product_id);
            let tempList = state.systemProducts;
            tempList[productIndex] = action.payload.updatedProduct;

            return {
                ...state,
                systemProducts: tempList
            }
        case DELETE_PRODUCT:
            let newProductsList = state.systemProducts.filter(product => product._id !== action.payload);
            return {
                ...state,
                systemProducts: newProductsList
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case SET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: { product: action.payload.selectedProduct, relatedProducts: action.payload.relatedProducts }
            }
        case SET_FILTERED_PRODUCTS:
            return {
                ...state,
                filteredProducts: action.payload
            }
        default:
            return state;
    }

}

export default productsReducer;