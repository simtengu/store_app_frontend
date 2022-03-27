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
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assignSelectedProduct } from "../store/actions/products";
import ItemDetails from "../components/productView/ItemDetails";
const ProductView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const { selectedProduct } = useSelector((state) => state.products);
  const { product, relatedProducts } = selectedProduct;
  const [isLoading, setIsLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const handleSetImg = (index)=>{
    setActiveImg(index)
  }
  useEffect(() => {
    const getProductInfo = async () => {
      try {
        setIsLoading(true);
        await dispatch(assignSelectedProduct(productId));
        setIsLoading(false);
      } catch (error) {
        //setIsLoading(false);
        console.log(error);
        navigate("/", { replace: true });
      }
    };

    getProductInfo();
  }, [productId]);

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
      <Container sx={{ mb: 5 }}>
        <Box sx={{ py: 1, px: 2, my: 2, bgcolor: "#eef1f2" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/getting-started/installation/"
            >
              Product Details
            </Link>
          </Breadcrumbs>
        </Box>

        <Grid container rowSpacing={2} spacing={2}>
          <Grid item xs={12} md={9}>
            {/* product pictures and details grid ............................ */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* selected  image...................... */}
                <a href={product.images[activeImg]} target="blank">

                <img
                  className="productViewImage"
                  src={product.images[activeImg]}
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
                          src={img}
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
                      <IconButton>
                        <AddShoppingCart sx={{ color: "#faaf00" }} />
                      </IconButton>
                    </Tooltip>

                    <Stack
                      direction="row"
                      className="cartControls"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <IconButton color="primary">
                        <ArrowLeft />
                      </IconButton>
                      <Typography variant="body2">1</Typography>
                      <IconButton color="primary">
                        <ArrowRight />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Box mt={2}>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                    >
                      <Tooltip title="Add To Wishlist" placement="top" arrow>
                        <IconButton sx={{ color: "#a0b3b8" }}>
                          <Star />
                        </IconButton>
                      </Tooltip>
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
