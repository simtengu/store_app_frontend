import React, { useState } from "react";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ShoppingCart,
  Star,
  AddShoppingCart,
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
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addCartItem } from "../store/actions/cart";
const HorizontalProduct = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const {
      cart: { cartItems },
    } = useSelector((state) => state.cart);
  const { title, category,description, price, images, _id: id } = product;
  const [value, setValue] = useState(2);

  const handleProductClicked = () => {
    navigate(`/product_details/${id}`);
  };

    const handleAddToCart = (event) => {
      event.stopPropagation();
      dispatch(addCartItem(product));
    };
  return (
    <>
      <Grid item xs={12} md={6}>
        <Card
          id="productCard"
          onClick={handleProductClicked}
          sx={{ display: "flex", width: { xs: "100%", md: "95%" } }}
        >
          <CardMedia
            sx={{ width: "40%" }}
            component="img"
            alt="green iguana"
            image={images[0]}
          />
          <Box sx={{ maxWidth: "60%" }}>
            <CardContent sx={{ pt: 1, pb: 0 }}>
              <Typography
                sx={{ fontWeight: "bold", color: "#343a40" }}
                variant="body1"
              >
                {title.substring(0, 19)}
                {title.length > 19 ? ".." : ""}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {price.toLocaleString()} Tsh
              </Typography>
              <Typography
                variant="caption"
                color="primary"
                display="block"
                gutterBottom
              >
                {category}
              </Typography>
              <Typography sx={{ color: "text.secondary" }} variant="body2">
                {description.substring(0, 60)}
                {description.length > 60 ? ".." : ""}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/cart");
                    }}
                    aria-label="to cart"
                  >
                    <ShoppingCart sx={{ color: "success" }} />
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
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default HorizontalProduct;
