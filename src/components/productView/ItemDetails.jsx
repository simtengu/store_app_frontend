import { Rating, Typography } from "@mui/material";
import React from "react";
const ItemDetails = ({ product }) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: "red" }}>
        {product.price.toLocaleString()} <span style={{ color: "black" }}>Tsh</span>
      </Typography>
      <Rating
        sx={{ display: "block" }}
        size="small"
        name="simple-controlled"
        value={5}
      />
      <Typography variant="body1" gutterBottom>
        {product.description}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: "bolder", color: "#4b4b4b" }}
        mt={2}
      >
        Category : {product.category}
      </Typography>
      {product.brand && (
        <Typography
          variant="body2"
          sx={{ fontWeight: "bolder", color: "#4b4b4b" }}
        >
          Brand : {product.brand}
        </Typography>
      )}

      {product.tags && (
        <Typography variant="caption" sx={{ color: "#7a969c", fontSize: 15 }}>
          Tags : {product.tags.map((tag) => tag + ",")}
        </Typography>
      )}
    </>
  );
};

export default ItemDetails;
