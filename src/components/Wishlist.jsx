import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Backdrop,
  CircularProgress,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Delete, More } from "@mui/icons-material";
import { removeFromWishlist } from "../store/actions/products";

const Wishlist = ({ titleSize }) => {
  const { wishlist } = useSelector((state) => state.products);
  let loading = wishlist ? false : true;
  const [isLoading, setIsLoading] = useState(loading);

  const dispatch = useDispatch();

  const handleRemoveItem = async (item_id) => {
    try {
      setIsLoading(true);
      await dispatch(removeFromWishlist(item_id));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <>
        <Box sx={{ width: "100%", height: "60vh" }}>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
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
      <Grid item xs={12} md={9}>
        <Box my={2}>
          <Typography
            variant={titleSize}
            sx={{ fontWeight: "bolder", textTransform: "uppercase" }}
          >
            My Wishlist
          </Typography>
          <div className="underline1"></div>

          <Box sx={{ width: { md: "95%", lg: "90%" } }} mt={4}>
            {wishlist.length > 0 ? (
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Category</TableCell>
                      <TableCell align="center">Brand</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wishlist.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <img width="70" alt="cart img" src={item.image} />
                        </TableCell>
                        <TableCell align="center">{item.title}</TableCell>
                        <TableCell align="center">
                          {item.price.toLocaleString()}
                        </TableCell>
                        <TableCell align="center">{item.category}</TableCell>
                        <TableCell align="center">{item.brand}</TableCell>
                        <TableCell align="center">
                          {" "}
                          <Stack direction="row">
                            <Tooltip title="see more" placement="top" arrow>
                              <Link to={`/product_details/${item._id}`}>
                                <IconButton color="primary">
                                  {" "}
                                  <More />{" "}
                                </IconButton>
                              </Link>
                            </Tooltip>
                            <IconButton
                              onClick={() => handleRemoveItem(item._id)}
                              sx={{ color: "#ff4a4a" }}
                            >
                              {" "}
                              <Delete />{" "}
                            </IconButton>{" "}
                          </Stack>{" "}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box my={10}>
                <center>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      color: "#4b4b4b",
                    }}
                  >
                    YOU DON'T HAVE ANY ITEM IN YOUR WISHLIST
                  </span>
                </center>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Wishlist;
