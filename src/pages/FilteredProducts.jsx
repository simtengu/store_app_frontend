import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SideBar from "../components/sidebar/SideBar";
import Product from "../components/Product";
import { useSelector } from "react-redux";
import Filters from "../components/Filters";
import { useNavigate,Link } from "react-router-dom";
import HorizontalProduct from "../components/HorizontalProduct";

const FilteredProducts = () => {
  const navigate = useNavigate();
  const {
    filteredProducts: { products, category },
  } = useSelector((state) => state.products);

  const [isLoading, setIsLoading] = useState(false);
  const [activeProductLayout, setActiveProductLayout] = useState("vertical");

  useEffect(() => {
    if (!products || products.length < 1) {
      navigate("/");
    }
  }, [products]);

  const openVerticalProducts = () => {
    setActiveProductLayout("vertical");
  };

  const openHorizontalProducts = () => {
    setActiveProductLayout("horizontal");
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={() => setIsLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container sx={{ mb: 5 }}>
        <Box sx={{ py: 1, px: 2, my: 2, bgcolor: "#eef1f2" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link style={{ color: "#808080" }} to="/">
              Home
            </Link>
            <span>{`${category.name}( ${category.value})`}</span>
          </Breadcrumbs>
        </Box>

        <Grid container rowSpacing={2} spacing={2}>
          <Grid item xs={12} md={9}>
            <Filters
              onOpenVerticalProducts={openVerticalProducts}
              onOpenHorizontalProducts={openHorizontalProducts}
            />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
                Found Products({products.length})
              </Typography>
              <div className="underline"></div>
            </Box>

            {activeProductLayout === "vertical" ? (
              <Grid container columnSpacing={1} rowSpacing={1}>
                {products &&
                  products.map((item) => {
                    return <Product key={item._id} product={item} />;
                  })}
              </Grid>
            ) : (
              <Grid container columnSpacing={1} rowSpacing={1}>
                {products &&
                  products.map((item) => {
                    return <HorizontalProduct key={item._id} product={item} />;
                  })}
              </Grid>
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

export default FilteredProducts;
