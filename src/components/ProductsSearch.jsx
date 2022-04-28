import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Close,
  Search,
} from "@mui/icons-material";
import {

  Grid,
  Stack,
  Typography,
  IconButton,
  Box,
  Card,
  Divider,
  Skeleton,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";


import api from "../api";
import {
  closeSearchDiv,
} from "../store/actions/errorAndLoading";
import notFound from "../images/aa.png";


const ProductsSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [foundProducts, setFoundProducts] = React.useState([]);
  const [nothingFound, setNothingFound] = React.useState(false);
  const [loadingResult, setLoadingResult] = React.useState(false);

  const handleSearch = async (e) => {
    let searchTerm = e.target.value.trim();
     setNothingFound(false);
    if (searchTerm.length > 1) {
      try {
       
        setLoadingResult(true);
        setFoundProducts([]);
        let rs = await api.get(`/products/search?search=${searchTerm}`);
        setLoadingResult(false);
        let rsData = rs.data;
        if (rsData.products.length > 0) {
          setFoundProducts(rsData.products);
        } else {
          setNothingFound(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCloseSearch = () => {
    dispatch(closeSearchDiv());
    setFoundProducts([]);
    setNothingFound(false);
  };

  const handleProductClick = (id) =>{
handleCloseSearch();
navigate(`/product_details/${id}`);
  }
  const skeletons = [1, 2, 4];
  return (
    <>
      <Box
        onClick={() => dispatch(closeSearchDiv())}
        className="searchDivContainer"
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={9} lg={7}>
            <Card
              sx={{
                mt: { md: 4, lg: 7 },
                minHeight: { xs: "100vh", md: "70vh" },
                py: 1,
              }}
              className="searchDiv"
              onClick={(e) => e.stopPropagation()}
            >
              <Box mt={2}>
                <Grid sx={{ py: 1, mb: 1 }} container>
                  <Grid item xs={1}>
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <Search />{" "}
                    </div>{" "}
                  </Grid>
                  <Grid item xs={10}>
                    {" "}
                    <input
                      type="text"
                      className="searchInput"
                      placeholder="Search......"
                      onChange={handleSearch}
                      autoFocus
                    />{" "}
                  </Grid>
                  <Grid item xs={1}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <IconButton onClick={handleCloseSearch}>
                        <Close />
                      </IconButton>{" "}
                    </div>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
              <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  <Box sx={{ mt: 1 }}>
                    {loadingResult &&
                      skeletons.map((skl) => {
                        return (
                          <Stack key={skl} direction="row" spacing={1} mt={1}>
                            <Box>
                              <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width={60}
                                height={60}
                              />
                            </Box>
                            <Box>
                              <Skeleton
                                variant="text"
                                sx={{ width: { xs: 196, md: 250 } }}
                                animation="wave"
                              />
                              <Skeleton
                                variant="text"
                                sx={{ width: { xs: 196, md: 250 }, mt: 1 }}
                                animation="wave"
                              />
                            </Box>
                          </Stack>
                        );
                      })}

                    {foundProducts.length > 0 && (
                      <Box>
                        {" "}
                        <Typography gutterBottom>
                          {foundProducts.length} product{foundProducts.length > 1 ? "s found." : " found"}
                          
                        </Typography>
                        {foundProducts.map((product) => {
                          return (
                            <Paper
                              key={product._id}
                              elevation={1}
                              sx={{
                                width: "fit-content",
                                mt: 1,
                                cursor: "pointer",
                              }}
                              onClick={() => handleProductClick(product._id)}
                            >
                              <Box
                                sx={{ width: { xs: 300, sm: 350 } }}
                                className="searchResult"
                              >
                                <img src={product.images[0]} alt="search pic" />
                                <Box ml={1}>
                                  <Typography>{product.title}</Typography>
                                  <Typography variant="body2">
                                    {product.price} Tsh
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="primary"
                                    display="block"
                                    gutterBottom
                                  >
                                    {product.category}
                                  </Typography>
                                </Box>
                              </Box>
                            </Paper>
                          );
                        })}
                      </Box>
                    )}

                    {nothingFound && (
                      <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img width="60" src={notFound} alt="not found" />
                        <Typography>We couldn't find any matches..</Typography>
                      </Stack>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default ProductsSearch;
