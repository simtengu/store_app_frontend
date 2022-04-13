import { Breadcrumbs, Container, Box, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import Wishlist from "../components/Wishlist";
const WishlistPage = () => {
  return (
    <>
      <Container sx={{ mb: 5 }}>
        <Box sx={{ py: 1, px: 2, my: 2, bgcolor: "#eef1f2", mx: { md: 3 } }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link className="normalLink" style={{ color: "#4b4b4b" }} to="/">
              Home
            </Link>
            <span>wishlist</span>
          </Breadcrumbs>
        </Box>

        <Grid container rowSpacing={2} spacing={2}>
          <Wishlist titleSize="h5" />
          <Grid item md={3}>
            <SideBar />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default WishlistPage;
