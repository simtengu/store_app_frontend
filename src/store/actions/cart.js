import secureApi from "../../api/secureApi";
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REDUCE_CART_ITEM = 'REDUCE_CART_ITEM';
export const PLACE_ORDER = 'PLACE_ORDER';
export const CLEAR_CART = 'CLEAR_CART';

export const addCartItem = (product) => {
    return (dispatch,getState)=>{
       const state = getState();
       const {cartItems} = state.cart.cart;
    //    console.log('cart items b4 update.. ',cartItems);
        dispatch({
            type: ADD_CART_ITEM,
            product
        })
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

        await secureApi.post("/order", data);
        
        dispatch({
            type: PLACE_ORDER
        })
    }
}

export const clearCart = ()=>{
    return {
        type: CLEAR_CART
    }
}