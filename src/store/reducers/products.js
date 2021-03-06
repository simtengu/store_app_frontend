import {
    ADD_PRODUCT, SET_FILTERED_PRODUCTS,
    SET_TRENDING__PRODUCTS, SET_PRODUCTS,
    SET_SYSTEM_PRODUCTS,
    DELETE_PRODUCT, UPDATE_PRODUCT,
    SET_WISHLIST
} from "../actions/products";

let initialState = {
    products: { products: [], count: 0 },
    systemProducts: [],
    filteredProducts: {
        products: [],
        category: {
            name: "",
            value: "Latest First"
        }
    },
    trendingProducts: [],
    wishlist: []
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
                products: { products: action.payload.products, count: action.payload.count }
            }
 
        case SET_FILTERED_PRODUCTS:
            return {
                ...state,
                filteredProducts: action.payload
            }
        case SET_TRENDING__PRODUCTS:
            return {
                ...state,
                trendingProducts: action.payload
            }

        case SET_WISHLIST:
            return {
                ...state,
                wishlist:action.wishlist
            }
        default:
            return state;
    }

}

export default productsReducer;