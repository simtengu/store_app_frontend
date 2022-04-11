import api from "../../api";
import secureApi from "../../api/secureApi";
export const SET_SYSTEM_PRODUCTS = 'SET_SYSTEM_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS';
export const SET_TRENDING__PRODUCTS = 'SET_TRENDING__PRODUCTS';
export const SET_WISHLIST = 'SET_WISHLIST';


//ACTION CREATORS FOR ADMIN.............................................. 
export const addNewProduct = (productData) => {

    return async (dispatch) => {
        //saving product to the database................ 

        const rs = await secureApi.post('product/store', productData);
        const rsData = await rs.data;

        dispatch({
            type: ADD_PRODUCT,
            payload: rsData.product
        })




    }
}
//for administrator operations......................
export const fetchSystemProducts = () => {
    return async (dispatch) => {
        //fetching products form api.... 

        const rs = await secureApi.get('/admin/products');
        const rsData = await rs.data;
        dispatch({
            type: SET_SYSTEM_PRODUCTS,
            payload: rsData.products
        })
    }
}

//delete product ............... 
export const deleteProduct = (productId) => {
    return async (dispatch) => {
        let rs = await secureApi.delete(`/admin/products/${productId}`);
        if (rs.status === 200) {
            dispatch({
                type: DELETE_PRODUCT,
                payload: productId
            })
        }

    }
}

//update product................. 
export const update_product = (info) => {
    return async (dispatch) => {

        let rs = await secureApi.patch(`/admin/products/${info.productId}`, info.productData);
        let rsData = await rs.data;
        if (rs.status === 200) {
            dispatch({
                type: UPDATE_PRODUCT,
                payload: { product_id: info.productId, updatedProduct: rsData.product }
            })
        }

    }
}

//ACTION CREATORS FOR NORMAL USERS............................. 

export const fetchProducts = (page) => {
    return async (dispatch) => {
        //fetch from the server................ 
        const rs = await api.get(`/products?page=${page}`);
        const rsData = await rs.data;
        if (rs.status !== 200) {
            throw new Error("Something went wrong, please try again later")
        }
        dispatch({
            type: SET_PRODUCTS,
            payload: {products:rsData.products,count:rsData.count}
        })
    }
}

export const assignSelectedProduct = (productId) => {
    return async (dispatch) => {

        // const state = getState();

        // const { products } = state.products;
        // if (products.length < 1) {
        //     throw new Error("no_products")

        // }
    //   ?category = ${ selectedProduct.category }& brand=${ selectedProduct.brand }
        //fetching related products....................... 
        const rs = await api.get(`/products/related/${productId}`);
        const rsData =  rs.data;
        dispatch({
            type: SET_SELECTED_PRODUCT,
            payload: { selectedProduct: rsData.product, relatedProducts: rsData.relatedProducts }
        })

    }
}

export const setFilteredProducts = (payload)=>{
 return  (dispatch)=>{
   dispatch({
     type:SET_FILTERED_PRODUCTS,
     payload
 })  
 } 
}

export const setTrendingProducts = (payload) => {
    return (dispatch) => {
        dispatch({
            type: SET_TRENDING__PRODUCTS,
            payload
        })
    }
}

export const getWishlist = ()=>{
    return async (dispatch)=>{

                    const rs = await secureApi.get(`/wishlist`);
                    const rsData = rs.data;
                    let wishlist =    rsData.wishlist.wishlist;

        
        dispatch({
            type: SET_WISHLIST,
            wishlist
        })
    }
}

export const addToWishlist = (data)=>{
    return async (dispatch)=>{

        const rs = await secureApi.post("/wishlist", data);
        const rsData = rs.data;
        const wishlist = rsData.wishlist.wishlist;
        dispatch({
            type: SET_WISHLIST,
            wishlist
        })
    }
}

export const removeFromWishlist = (item_id) => {
    return async (dispatch) => {

        const rs = await secureApi.patch(`/wishlist/${item_id}`);
        const rsData = rs.data;
        const wishlist = rsData.wishlist.wishlist;
        dispatch({
            type: SET_WISHLIST,
            wishlist
        })
    }
}