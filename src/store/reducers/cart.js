import { ADD_CART_ITEM, REDUCE_CART_ITEM, PLACE_ORDER, CLEAR_CART } from '../actions/cart';
import CartItem from "../../resources/cartItem"
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
            let inCartItem = state.cart.cartItems.find((product) => product._id === action.product._id);
            let itemsInCart = state.cart.cartItems;
            let newOrUpdatedItem = inCartItem ? 
                                                new CartItem(inCartItem._id, inCartItem.quantity + 1,
                                                     inCartItem.amount + inCartItem.price, inCartItem.price, inCartItem.title,inCartItem.image)
                                              : new CartItem( action.product._id, 1, action.product.price, action.product.price,
                                                               action.product.title,action.product.images[0]
                );
            // console.log('passed item .. ', action.product)
            // console.log('passed items id',action.product._id)
            // console.log('item in cart ..', inCartItem)
                if(inCartItem){
                    // console.log('the item is in the cart.......')
           
                    let itemIndex = itemsInCart.findIndex(item=>item._id === action.product._id);
                    
                    // console.log('item incart index ',itemIndex)
                    itemsInCart[itemIndex] = newOrUpdatedItem;
                   // console.log('itemsInCart[itemIndex]', itemsInCart[itemIndex]);
                     
                    // console.log('items in cart updated ',itemsInCart)
                    let inCartIds = itemsInCart.map(item=>item._id);
                    // console.log('in cart ids ',inCartIds)
                    return {
                            ...state,
                            cart: {
                                    totalAmount: state.cart.totalAmount + inCartItem.price,
                                    totalQuantity: state.cart.totalQuantity + 1,
                                    cartItems: itemsInCart
                                }
                            }
                            
                        }else{
                       
                            itemsInCart.push(newOrUpdatedItem)
                            let inCartIds = itemsInCart.map(item=>item._id);
                            // console.log('in cart ids after update.. ',inCartIds)


                    return {
                        ...state,
                        cart: {
                            totalAmount: state.cart.totalAmount + action.product.price,
                            totalQuantity: state.cart.totalQuantity + 1,
                            cartItems: itemsInCart
                        }
                    }

                }


        case REDUCE_CART_ITEM:
            let cartProducts = state.cart.cartItems;
            let itemInCart = cartProducts.find(item => item._id === action.productId);
            // console.log('cart_items', cartProducts)
            // console.log('passed id', action.productId)
            // console.log('itemInCart', itemInCart)
            let totalAmountt = state.cart.totalAmount - itemInCart.price;
            let totalQuantityy = state.cart.totalQuantity - 1;
            if (itemInCart.quantity > 1) {
                let itemIndex = cartProducts.map(item => item._id).indexOf(action.productId);
                let latestItem = new CartItem(itemInCart._id, itemInCart.quantity - 1, itemInCart.amount - itemInCart.price,itemInCart.price,itemInCart.title,itemInCart.image); 

                cartProducts[itemIndex] = latestItem
                // console.log('cartproduct[itemIndex]', cartProducts)
          
                return {
                    ...state,
                    cart: { totalAmount: totalAmountt, totalQuantity: totalQuantityy, cartItems: cartProducts }
                }
            } else {
               let latestItemsList = cartProducts.filter(item => item._id !== action.productId);
                return {
                    ...state,
                    cart: { totalAmount: totalAmountt, totalQuantity: totalQuantityy, cartItems: latestItemsList }
                }

            }


     

        case CLEAR_CART:
            return {
                ...state,
                cart: {
                    totalAmount: 0,
                    totalQuantity: 0,
                    cartItems: []
                }

            }
        case PLACE_ORDER:
            return {
                orders: state.orders.concat([state.cart]), cart: {
                    totalAmount: 0,
                    totalQuantity: 0,
                    cartItems: []
                }
            }

        default:
            return state;
    }

}

export default cartReducer;