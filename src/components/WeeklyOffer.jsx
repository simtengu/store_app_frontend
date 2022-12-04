import React,{useState} from "react";
import { Box, Button, Grid, IconButton, Paper, Rating, Stack, Typography,Alert as MuiAlert, Snackbar, Tooltip } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { AddShoppingCart, ShoppingCart, Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../store/actions/cart";
import { addToWishlist } from "../store/actions/products";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WeeklyOffer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(2.5);
  //handling response state(feedback)........
  const [feedback, setFeedback] = useState({
    message: "",
    status: "error",
    isActive: false,
  });

  const { authUser } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.products);

  const userWishlist = wishlist || [];

  const { products } = useSelector((state) => state.products.products);
  const { cartItems } = useSelector((state) => state.cart.cart);
  let product = products && products.length > 0 ? products[0] :  {
    title: "samsung 4",
    price: "500000",
    description: "the best in town at the moment",
    category: "the best category for the best phone",
    images: [{image:"http://localhost:5000/uploads/83830033.jpg"}],
  };

  let newPrice = products && products.length > 0 ? product.price - Math.ceil((30 / 100) * product.price) : 444;
  // let index = products.length - 1;
  // if (products.length > 0) {
  //   product = products[index];
  // }

    const { title,description,category, price, images, _id: id } = product;

   const handleAddToCart = () => {
     dispatch(addCartItem(product));
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
       title,
       category,
       brand: product.brand,
       _id: id,
       price,
       image: images[0].image,
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
         message:
           "we couldn't add the item to your wishlist .. try again later",
         status: "error",
         isActive: true,
       });
     }
   };


  if (products.length > 0) {
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

        <Box
          className="weeklyOfferr"
          sx={{
            width: "100%",
            p: 4,
          }}
        >
          <Button
            sx={{ color: "#51a2df", mb: 3, fontSize: 24 }}
            size="large"
            startIcon={<DoubleArrowIcon />}
          >
            Weekly Offer
          </Button>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  background: "linear-gradient(to top right,#9cdcfe,#1976c8)",
                  px: 3,
                  py: 3,
                  height: "100%",
                }}
                square
              >
                <center>
                  <Typography
                    variant="h5"
                    sx={{ color: "#e5e5e5", textShadow: "1px 1px 7px #faaf00" }}
                  >
                    {title}
                  </Typography>
                </center>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="body"
                    sx={{ color: "#000", display: "block" }}
                  >
                    {description}
                  </Typography>

                  <Button
                    sx={{
                      color: "#f4524f",
                      fontSize: 14,
                      mt: 1,
                      textDecoration: "line-through",
                    }}
                    size="small"
                    startIcon={<DoubleArrowIcon />}
                  >
                    {price.toLocaleString()}{" "}
                    <span style={{ color: "#df9c00" }}> &nbsp;Tsh</span>
                  </Button>
                  <br />
                  <Button
                    sx={{
                      color: "#5b5b5b",
                      fontSize: 14,
                    }}
                    size="small"
                    startIcon={<DoubleArrowIcon />}
                  >
                    {newPrice.toLocaleString()} Tsh
                  </Button>

                  <Stack spacing={2} sx={{ my: 2 }} direction="row">
                    {userWishlist.some((item) => item._id === id) ? (
                      <Tooltip title="Go To Wishlist" placement="top" arrow>
                        <IconButton
                          sx={{ color: "green", bgcolor: "#5aa8e3" }}
                          onClick={() => {
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
                          sx={{
                            bgcolor: "#5aa8e3",
                            "&:hover": { bgcolor: "#2e87d1" },
                          }}
                        >
                          <Star sx={{ color: "#f4524f" }} />
                        </IconButton>
                      </Tooltip>
                    )}

                    {cartItems.some((item) => item._id === id) ? (
                      <Tooltip title="Go To Cart" placement="top" arrow>
                        <IconButton
                          sx={{ bgcolor: "#5aa8e3", color: "green" }}
                          onClick={() => {
                            navigate("/cart");
                          }}
                          aria-label="to cart"
                        >
                          <ShoppingCart />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add To Cart" placement="top" arrow>
                        <IconButton
                          onClick={handleAddToCart}
                          sx={{
                            bgcolor: "#5aa8e3",
                            "&:hover": { bgcolor: "#2e87d1" },
                          }}
                        >
                          <AddShoppingCart sx={{ color: "#f4524f" }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                  <Rating
                    size="large"
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ bgcolor: "#51a2df", px: 3, py: 3 }} square>
                <img
                  style={{ width: "100%" }}
                  src={images.length > 0 ? images[0].image : ""}
                  alt="weekly imgg"
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  } else {
    return <center>loading product</center>;
  }
};;

export default WeeklyOffer;
