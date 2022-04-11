import { Grid } from "@mui/material";
import React from "react";
import Wishlist from "../Wishlist";

const WishlistSection = () => {
  return (
    <>
      <Grid container>
        <Wishlist titleSize="h6" />
      </Grid>
    </>
  );
};

export default WishlistSection;
