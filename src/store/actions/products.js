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

export const fetchProducts = () => {
    return async (dispatch) => {
        //fetch from the server................ 
        const rs = await api.get("/products");
        const rsData = await rs.data;
        if (rs.status !== 200) {
            throw new Error("Something went wrong, please try again later")
        }
        dispatch({
            type: SET_PRODUCTS,
            payload: rsData.products
        })
    }
}

export const assignSelectedProduct = (productId) => {
    return async (dispatch, getState) => {

        // const state = getState();

        // const { products } = state.products;
        // if (products.length < 1) {
        //     throw new Error("no_products")

        // }
    //   ?category = ${ selectedProduct.category }& brand=${ selectedProduct.brand }
        //fetching related products....................... 
        const rs = await api.get(`/products/related/${productId}`);
        const rsData = await rs.data;
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