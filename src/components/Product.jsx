import React, { useState } from "react";
import {
  AddShoppingCart,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ShoppingCart,
  Star,
} from "@mui/icons-material";
import {
  Alert as MuiAlert,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../store/actions/cart";
import { addToWishlist } from "../store/actions/products";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, category, price, images, _id: id } = product;

  const {
    cart: { cartItems },
  } = useSelector((state) => state.cart);

  const { authUser } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.products);

  const userWishlist = wishlist || [];

  //handling response state(feedback)........
  const [feedback, setFeedback] = useState({
    message: "",
    status: "error",
    isActive: false,
  });

  const handleProductClicked = () => {
    navigate(`/product_details/${id}`);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch(addCartItem(product));
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();

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
      image: images[0],
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
      <Grid item xs={6} sm={4} md={3}>
        <Card
          id="productCard"
          onClick={handleProductClicked}
          sx={{
            width: { xs: "100%", md: "95%" },
            "&:hover": { boxShadow: "1px 1px 3px #db8526" },
          }}
        >
          <CardMedia component="img" alt="green iguana" image={images[0]} />

          <CardContent sx={{ pt: 1, pb: 0 }}>
            <Typography
              variant="caption"
              color="primary"
              display="block"
              gutterBottom
            >
              {category}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", color: "#343a40" }}
              variant="body2"
            >
              {title.substring(0, 19)}
              {title.length > 19 ? ".." : ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {price.toLocaleString()} Tsh
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {userWishlist.some((item) => item._id === id) ? (
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
                  aria-label="add to favorites"
                >
                  <Star sx={{ color: "primary.light" }} />
                </IconButton>
              </Tooltip>
            )}

            {cartItems.some((item) => item._id === id) ? (
              <Tooltip title="Go To Cart" placement="top" arrow>
                <IconButton
                  sx={{ color: "green" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/cart");
                  }}
                  aria-label="to cart"
                >
                  <ShoppingCart />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Add To Cart" placement="top" arrow>
                <IconButton onClick={handleAddToCart} aria-label="to cart">
                  <AddShoppingCart sx={{ color: "primary.light" }} />
                </IconButton>
              </Tooltip>
            )}

            <div style={{ marginLeft: "auto", marginTop: "auto" }}>
              <Rating size="small" name="simple-controlled" value={5} />
            </div>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Product;
