import React, { useState } from "react";
import {
  AddShoppingCart,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ShoppingCart,
  Star,
} from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../store/actions/cart";
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, category, price, images, _id: id } = product;
  const [value, setValue] = useState(2);
  const {
    cart: { cartItems },
  } = useSelector((state) => state.cart);

  const handleProductClicked = () => {
    navigate(`/product_details/${id}`);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch(addCartItem(product));
  };
  return (
    <>
      <Grid item xs={6} sm={4} md={3}>
        <Card
          id="productCard"
          onClick={handleProductClicked}
          sx={{ width: { xs: "100%", md: "95%" } }}
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
            <Tooltip title="Add To Wishlist" placement="top" arrow>
              <IconButton aria-label="add to favorites">
                <Star sx={{ color: "primary.light" }} />
              </IconButton>
            </Tooltip>
            {cartItems.some((item) => item._id === id) ? (
              <Tooltip title="Go To Cart" placement="top" arrow>
                <IconButton
                  onClick={(e) =>{e.stopPropagation();navigate("/cart")} }
                  aria-label="to cart"
                >
                  <ShoppingCart sx={{ color: "success" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Add To Cart" placement="top" arrow>
                <IconButton
                  onClick={handleAddToCart}
                  aria-label="to cart"
                >
                  <AddShoppingCart sx={{ color: "primary.light" }} />
                </IconButton>
              </Tooltip>
            )}


            <div style={{ marginLeft: "auto", marginTop: "auto" }}>
              <Rating
                size="small"
                name="simple-controlled"
                value={5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Product;
