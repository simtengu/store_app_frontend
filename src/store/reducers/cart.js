import { ADD_CART_ITEM, REDUCE_CART_ITEM, PLACE_ORDER } from '../actions/cart';
let initialState = {
    orders: [],
    cart: {
        totalAmount: 0,
        totalQuantity: 0,
        cartItems: []
    }
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CART_ITEM:
            //checking if item was already in the cart........ 
            let cartItems = state.cart.cartItems;
            let product = action.product;
            let newCartItem;
            let isItemInCart = cartItems.some(item => item._id === product._id);
            let totalAmount;
            let totalQuantity;
            let newItemsList;

            totalAmount = state.cart.totalAmount + product.price;
            totalQuantity = state.cart.totalQuantity + 1;

            if (isItemInCart) {
                let itemInCart = cartItems.find(item => item._id === product._id);
                let itemIndex = cartItems.findIndex(item => item._id === product._id);
                newCartItem = {
                    ...itemInCart,
                    quantity: itemInCart.quantity + 1,
                    amount: itemInCart.amount + product.price
                }
                cartItems[itemIndex] = newCartItem
                newItemsList = cartItems
            } else {

                newCartItem = {
                    quantity: 1,
                    amount: product.price,
                    price: product.price,
                    title: product.title,
                    image: product.images[0],
                    brand: product.brand,
                    _id: product._id
                }
                newItemsList = cartItems.concat([newCartItem])
            }
            return {
                ...state,
                cart: { totalAmount, totalQuantity, cartItems: newItemsList }
            }
        case REDUCE_CART_ITEM:

            let latestItemsList;
            let cartProducts = state.cart.cartItems;
            let itemInCart = cartProducts.find(item => item._id === action.productId);
            let totalAmountt = state.cart.totalAmount - itemInCart.price;
            let totalQuantityy = state.cart.totalQuantity - 1;
            if (itemInCart.quantity > 1) {
                let itemIndex = cartProducts.findIndex(item => item._id === action.productId);
                let latestItem = {
                    ...itemInCart,
                    quantity: itemInCart.quantity - 1,
                    amount: itemInCart.amount - itemInCart.price
                }
                cartProducts[itemIndex] = latestItem
                latestItemsList = cartProducts

            } else {
                latestItemsList = cartProducts.filter(item => item._id !== action.productId);

            }


            return {
                ...state,
                cart: { totalAmount: totalAmountt, totalQuantity: totalQuantityy, cartItems: latestItemsList }
            }
        case PLACE_ORDER:
            return {
                orders: state.orders.concat([state.cart]), cart: {
                    totalAmount: 0,
                    totalQuantity: 0,
                    cartItems: []
                } }

        default:
            return state;
    }

}

export default cartReducer;