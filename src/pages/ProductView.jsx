import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  Alert as MuiAlert,
} from "@mui/material";
import SideBar from "../components/sidebar/SideBar";
import {
  AddShoppingCart,
  ArrowLeft,
  ArrowRight,
  Share,
  Star,
} from "@mui/icons-material";
import Product from "../components/Product";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  assignSelectedProduct,
  setTrendingProducts,
} from "../store/actions/products";
import ItemDetails from "../components/productView/ItemDetails";
import axios from "../api";
import { addCartItem, reduceCartItem } from "../store/actions/cart";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ProductView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const { wishlist } = useSelector((state) => state.products);

  const userWishlist = wishlist || [];
  const {
    cart: { cartItems },
  } = useSelector((state) => state.cart);

  const { authUser } = useSelector((state) => state.auth);
  //handling response state(feedback)........
  const [feedback, setFeedback] = useState({
    message: "",
    status: "error",
    isActive: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const handleSetImg = (index) => {
    setActiveImg(index);
  };

  const handleAddToWishlist = async () => {
    if (!authUser) {
      setFeedback({
        message: "you need to login first.",
        status: "error",
        isActive: true,
      });
      return;
    }

    let itemInfo = {
      title: product.title,
      category: product.category,
      brand: product.brand,
      _id: product._id,
      price: product.price,
      image: product.images[0].image,
    };

    try {
      await dispatch(addToWishlist(itemInfo));

      setFeedback({
        message: "Item successfully added to your wishlist",
        status: "success",
        isActive: true,
      });
    } catch (error) {
      console.log(error);
      setFeedback({
        message: "we couldn't add the item to your wishlist .. try again later",
        status: "error",
        isActive: true,
      });
    }
  };

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        setIsLoading(true);
        const rs = await axios.get(`/products/related/${productId}`);
        const rsData = rs.data;
        setProduct(rsData.product);
        setRelatedProducts(rsData.relatedProducts);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        navigate("/", { replace: true });
      }
    };

    getProductInfo();
  }, [productId]);

  // updating products number of views
  useEffect(() => {
    const updateTrendingProducts = async () => {
      try {
        const rs = await axios.patch(`/products/trendingUpdate/${productId}`);
        if (rs.status === 200) {
          const rsData = await rs.data;
          dispatch(setTrendingProducts(rsData.products));
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateTrendingProducts();
  }, [productId]);
  let cartItem;
  if (cartItems.some((item) => item._id === productId)) {
    cartItem = cartItems.find((item) => item._id === productId);
  }

  const handleAddCartItem = () => {
    dispatch(addCartItem(product));
  };

  const handleRemoveCartItem = () => {
    dispatch(reduceCartItem(productId));
  };

  if (isLoading) {
    return (
      <>
        <Box sx={{ width: "100%", height: "60vh" }}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={() => setIsLoading(false)}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </>
    );
  }

  return (
    <>
      <Snackbar
        open={feedback.isActive}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, isActive: false })}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Alert
          onClose={() => setFeedback({ ...feedback, isActive: false })}
          severity={feedback.status}
          sx={{ width: "100%" }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
      <Container sx={{ mb: 5 }}>
        <Box sx={{ py: 1, px: 2, my: 2, bgcolor: "#eef1f2" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link style={{ color: "#4b4b4b" }} to="/">
              Home
            </Link>
            <span>Product Details</span>
          </Breadcrumbs>
        </Box>

        <Grid container rowSpacing={2} spacing={2}>
          <Grid item xs={12} md={9}>
            {/* product pictures and details grid ............................ */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* selected  image...................... */}
                <a
                  href={
                    product.images.length > 0
                      ? product.images[activeImg].image
                      : ""
                  }
                  target="blank"
                >
                  <img
                    className="productViewImage"
                    src={
                      product.images.length > 0
                        ? product.images[activeImg].image
                        : ""
                    }
                    alt="product "
                  />
                </a>
                {/* other product images .................... */}
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  mt={1}
                >
                  {product.images.map((img, index) => {
                    return (
                      <Grid key={index} item xs={3}>
                        <img
                          className="productViewImage"
                          src={img.image}
                          alt="product"
                          onClick={() => handleSetImg(index)}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    width: "100%",
                    minHeight: { xs: "auto", md: "420px" },
                    p: 2,
                  }}
                >
                  <ItemDetails product={product} />

                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Add to cart" placement="top" arrow>
                      <IconButton onClick={handleAddCartItem}>
                        <AddShoppingCart sx={{ color: "#faaf00" }} />
                      </IconButton>
                    </Tooltip>

                    {cartItem && (
                      <Stack
                        direction="row"
                        className="cartControls"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconButton
                          onClick={handleRemoveCartItem}
                          color="primary"
                        >
                          <ArrowLeft />
                        </IconButton>
                        <Typography variant="body2">
                          {cartItem.quantity}
                        </Typography>
                        <IconButton onClick={handleAddCartItem} color="primary">
                          <ArrowRight />
                        </IconButton>
                      </Stack>
                    )}
                  </Stack>
                  <Box mt={2}>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                    >
                      {userWishlist.some((item) => item._id === productId) ? (
                        <Tooltip title="Go To Wishlist" placement="top" arrow>
                          <IconButton
                            sx={{ color: "green" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/wishlist");
                            }}
                            aria-label="add to favorites"
                          >
                            <Star />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Add To Wishlist" placement="top" arrow>
                          <IconButton
                            onClick={handleAddToWishlist}
                            sx={{ color: "#a0b3b8" }}
                          >
                            <Star />
                          </IconButton>
                        </Tooltip>
                      )}

                      <Tooltip title="Share This Product" placement="top" arrow>
                        <IconButton sx={{ color: "#a0b3b8" }}>
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            {/*  end of product pictures and details grid ............................ */}
            {relatedProducts.length > 0 ? (
              <Box mt={12}>
                <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
                  Related Products
                </Typography>
                <div className="underline"></div>
                <Grid mt={2} container columnSpacing={1} rowSpacing={1}>
                  {relatedProducts.map((item) => {
                    return <Product key={item._id} product={item} />;
                  })}
                </Grid>
              </Box>
            ) : (
              ""
            )}
          </Grid>
          <Grid item md={3}>
            <SideBar />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductView;

// import { ADD_CART_ITEM, REDUCE_CART_ITEM, PLACE_ORDER, CLEAR_CART } from '../actions/cart';
// let initialState = {
//     orders: [],
//     cart: {
//         totalAmount: 0,
//         totalQuantity: 0,
//         cartItems: []
//     }
// }
// const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_CART_ITEM:
//             //checking if item was already in the cart........
//             const cartItems = state.cart.cartItems;
//             let product = action.product;
//             let isItemInCart = cartItems.some(item => item._id === product._id);
//             console.log('is item in cart ',isItemInCart)
//             console.log('prev cartItems ', state.cart.cartItems)
//             let totalAmount;
//             let totalQuantity;
//             let newCartItem

//             totalAmount = state.cart.totalAmount + product.price;
//             totalQuantity = state.cart.totalQuantity + 1;

//             let cartItem = cartItems.find(item => item._id === product._id);
//             if(cartItem){
//                 console.log('true')
//             }else{
//                 console.log('false')
//             }
//             if (cartItem) {
//                 let itemIndex = cartItems.map((item) => item._id ).indexOf(product._id);

//                newCartItem = {
//                    ...cartItem,
//                    quantity: cartItem.quantity + 1,
//                     amount: cartItem.amount + product.price
//                 }
//                 console.log('itemIndex in cartArray ',itemIndex)
//                 console.log('item in cart ',cartItem);
//                 console.log('passed_item_id ',product._id)
//                 console.log('found_item_in_cart_id ',cartItem._id)
//                 cartItems[itemIndex] = newCartItem
//                 console.log('newItemsList', cartItems)
//                 return {
//                     ...state,
//                     cart: { totalAmount, totalQuantity, cartItems: cartItems }
//                 }

//             } else {

//                 newCartItem = {
//                     _id: product._id,
//                     quantity: 1,
//                     amount: product.price,
//                     price: product.price,
//                     title: product.title
//                 }
//                 console.log('new cart item ',newCartItem)
//                 cartItems.push(newCartItem);
//                 console.log('newItemsList',cartItems)

//                 return {
//                     ...state,
//                     cart: { totalAmount, totalQuantity, cartItems: cartItems }
//                 }

//             }

//         case REDUCE_CART_ITEM:

//             let latestItemsList;
//             let cartProducts = state.cart.cartItems;
//             let itemInCart = cartProducts.find(item => item._id === action.productId);
//             console.log('cart_items',cartProducts)
//             console.log('passed id',action.productId)
//             console.log('itemInCart',itemInCart)
//             let totalAmountt = state.cart.totalAmount - itemInCart.price;
//             let totalQuantityy = state.cart.totalQuantity - 1;
//             if (itemInCart.quantity > 1) {
//                 let itemIndex = cartProducts.map(item => item._id).indexOf(action.productId);
//                 let latestItem = {
//                     ...itemInCart,
//                     quantity: itemInCart.quantity - 1,
//                     amount: itemInCart.amount - itemInCart.price
//                 }
//                 cartProducts[itemIndex] = latestItem
//                 console.log('cartproduct[itemIndex]',cartProducts)
//                 latestItemsList = cartProducts
//                 console.log('latestItems list ',latestItemsList)

//             } else {
//                 latestItemsList = cartProducts.filter(item => item._id !== action.productId);

//             }

//             return {
//                 ...state,
//                 cart: { totalAmount: totalAmountt, totalQuantity: totalQuantityy, cartItems: latestItemsList }
//             }

//         case CLEAR_CART:
//             return {
//                ...state,
//                 cart: {
//                     totalAmount: 0,
//                     totalQuantity: 0,
//                     cartItems: []
//                 }

//             }
//         case PLACE_ORDER:
//             return {
//                 orders: state.orders.concat([state.cart]), cart: {
//                     totalAmount: 0,
//                     totalQuantity: 0,
//                     cartItems: []
//                 } }

//         default:
//             return state;
//     }

// }

// export default cartReducer;
