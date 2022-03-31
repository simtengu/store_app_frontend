import secureApi from "../../api/secureApi";
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REDUCE_CART_ITEM = 'REDUCE_CART_ITEM';
export const PLACE_ORDER = 'PLACE_ORDER';

export const addCartItem = (product) => {
    return {
        type: ADD_CART_ITEM,
        product
    }
}

export const reduceCartItem = (productId) => {
    return {
        type: REDUCE_CART_ITEM,
        productId
    }
}

export const submitOrder = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const { auth: { authUser }, cart: { cart } } = state;
        const data = {
            totalQuantity: cart.totalQuantity,
            totalAmount: cart.totalAmount,
            orderItems: cart.cartItems,
            owner: authUser._id
        }
    
        const rs = await secureApi.post("/order", data);
        const rsData = await rs.data;
    
        dispatch({
            type: PLACE_ORDER
        })
    }
}