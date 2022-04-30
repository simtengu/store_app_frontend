import React from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Tooltip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import SideBar from "../components/sidebar/SideBar";
import {
  AddShoppingCart,
  ArrowLeft,
  ArrowRight,
  Send,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, clearCart, reduceCartItem } from "../store/actions/cart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/ProtectedRoutes";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    cart: { totalAmount, totalQuantity, cartItems },
  } = useSelector((state) => state.cart);
  let authenticated = useAuth();
  const handleCheckout = () => {
    if (authenticated) {
      navigate("/checkout");
    } else {
      alert("to proceed login first..");
    }
  };
  return (
    <>
      <Container sx={{ mb: 5 }}>
        <Box sx={{ py: 1, px: 2, my: 2, bgcolor: "#eef1f2" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link className="normalLink" style={{ color: "#4b4b4b" }} to="/">
              Home
            </Link>
            <span>Cart</span>
          </Breadcrumbs>
        </Box>

        <Box my={2}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bolder", textTransform: "uppercase" }}
          >
            Shopping Cart
          </Typography>
          <div className="underline1"></div>

          <Box sx={{ width: { md: "95%", lg: "90%" } }} mt={4}>
            {cartItems.length > 0 ? (
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Total (Tsh)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item, index) => (
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
                        <TableCell align="center">
                          <Stack
                            direction="row"
                            className="cartControls"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <IconButton
                              onClick={() => {
                                dispatch(reduceCartItem(item._id));
                              }}
                              color="primary"
                            >
                              <ArrowLeft />
                            </IconButton>
                            <Typography variant="body2">
                              {item.quantity}
                            </Typography>
                            <IconButton
                              onClick={() => {
                                dispatch(addCartItem(item));
                              }}
                              color="primary"
                            >
                              <ArrowRight />
                            </IconButton>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          {item.amount.toLocaleString()}
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
                    YOU DON'T HAVE ITEMS IS YOUR CART..ADD SOME
                  </span>
                </center>
              </Box>
            )}
          </Box>
          {cartItems.length > 0 && (
            <>
              <Stack direction="row" my={1}>
                {" "}
                <Button
                  onClick={() => dispatch(clearCart())}
                  variant="outlined"
                >
                  clear cart
                </Button>{" "}
              </Stack>

              <Box
                sx={{
                  display: "inline-block",
                  bgcolor: "#ffd064",
                  p: 2,
                  mt: 3,
                  borderRadius: 4,
                }}
              >
                <Typography sx={{ mt: 2, color: "#1976d2" }} variant="body1">
                  Total Amount :{" "}
                  <span style={{ color: "#4b4b4b" }}>
                    {totalAmount.toLocaleString()} Tsh
                  </span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#1976d2" }}
                  gutterBottom
                >
                  Total Items :{" "}
                  <span style={{ color: "#4b4b4b" }}>
                    {totalQuantity.toLocaleString()}
                  </span>
                </Typography>

                <Button
                  onClick={handleCheckout}
                  mt={2}
                  sx={{
                    color: "#4b4b4b",

                    bgcolor: "white",
                    "&:hover": {
                      color: "#1976d2",
                      bgcolor: "white",
                    },
                  }}
                  variant="contained"
                  endIcon={<Send />}
                >
                  CheckOut
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Cart;
