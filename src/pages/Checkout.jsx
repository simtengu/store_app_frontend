import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert as MuiAlert,
  Backdrop,
  CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { submitOrder } from "../store/actions/cart";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [fName, setFName] = useState(authUser ? authUser.firstName : "");
  const [lName, setLName] = useState(authUser ? authUser.lastName : "");
  const [email, setEmail] = useState(authUser ? authUser.email : "");
  const [phone, setPhone] = useState(authUser ? authUser.phone : "");
  const [country, setCountry] = useState("Tanzania");
  const [town, setTown] = useState("");
  const [adress, setAdress] = useState("");

  const [isLoading,setIsLoading] = useState(false);

    const [feedback, setFeedback] = useState({
      message: "",
      status: "error",
      isActive: false,
    });

  const handleOrderSubmit = async () => {
    if (cart.cartItems.length < 1) {
            setFeedback({
              message: "Please make sure you have atleast one item in your cart",
              status: "error",
              isActive: true,
            });
      return;
    }
    try {
      setIsLoading(true)
      await dispatch(submitOrder());
      setIsLoading(false)
      setFeedback({
        message:
        "Your order was received successfully.",
        status: "success",
        isActive: true,
      });
    } catch (error) {
      setIsLoading(false)
                 setFeedback({
                   message:
                     "Something went wrong ...try again later",
                   status: "error",
                   isActive: true,
                 });
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authUser) {
      navigate("/");
    }
  }, [authUser]);
  if (authUser) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={() => setIsLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar
          open={feedback.isActive}
          autoHideDuration={4000}
          onClose={() => setFeedback({ ...feedback, isActive: false })}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Alert
            onClose={() => setFeedback({ ...feedback, isActive: false })}
            severity={feedback.status}
            sx={{ width: "100%" }}
          >
            {feedback.message}
          </Alert>
        </Snackbar>
        <Container sx={{ mb: 5 }}>
          <Box sx={{ py: 1, px: 2, my: 2, bgcolor: "#eef1f2" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link className="normalLink" style={{ color: "#808080" }} to="/">
                Home
              </Link>
              <span>Checkout</span>
            </Breadcrumbs>
          </Box>
          <Box mt={12}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bolder", textTransform: "uppercase" }}
            >
              Checkout
            </Typography>
            <div className="underline1"></div>
            <Grid container mt={6}>
              <Grid item xs={12} p={1} md={6}>
                <Box
                  component="form"
                  className="billingForm"
                  sx={{
                    border: "1px solid #c4c4c4",
                    p: 2,

                    borderRadius: 2,
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Typography variant="h5" mb={2} gutterBottom>
                    Billing Details
                  </Typography>
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} sm={6}>
                      <div>
                        <TextField
                          label="first name"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                          value={fName}
                          onChange={(e) => setFName(e.target.value)}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div>
                        <TextField
                          label="last name"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                          value={lName}
                          onChange={(e) => setLName(e.target.value)}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div>
                        <TextField
                          label="email"
                          type="email"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div>
                        <TextField
                          type="number"
                          label="Phone"
                          size="small"
                          fullWidth
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-label">
                          Country
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Country"
                          size="small"
                          fullWidth
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <MenuItem value={"Kenya"}>Kenya</MenuItem>
                          <MenuItem value={"Uganda"}>Uganda</MenuItem>
                          <MenuItem value={"Tanzania"}>Tanzania</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div>
                        <TextField
                          label="Town/City"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                          value={town}
                          onChange={(e) => setTown(e.target.value)}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div>
                        <TextField
                          label="Street Adress"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                          value={adress}
                          onChange={(e) => setAdress(e.target.value)}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} p={1} md={6}>
                {cart.cartItems.length > 0 && (
                  <Box
                    className="billingForm"
                    sx={{
                      border: "1px solid #c4c4c4",
                      p: 2,

                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h5" mb={2} gutterBottom>
                      Your Order
                    </Typography>
                    <Box sx={{ p: 1 }}>
                      <TableContainer component={Box}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>#</TableCell>
                              <TableCell align="center">Product</TableCell>
                              <TableCell align="center">Quantity</TableCell>
                              <TableCell align="center">Total (Tsh)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {cart.cartItems.map((item, index) => {
                              return (
                                <TableRow
                                  key={index}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell align="center">
                                    {item.title}
                                  </TableCell>
                                  <TableCell align="center">
                                    {item.quantity}
                                  </TableCell>

                                  <TableCell align="center">
                                    {item.amount.toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Typography mt={2} variant="body2">
                        Total Items = {cart.totalQuantity}
                      </Typography>
                      <Typography mt={2} variant="body1">
                        Total Amount = {cart.totalAmount.toLocaleString()} Tsh
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>
            <Button
              onClick={handleOrderSubmit}
              variant="contained"
              sx={{ mt: 3 }}
              size="large"
            >
              Submit
            </Button>
          </Box>
        </Container>
      </>
    );
  } else {
    return <h2>loading</h2>;
  }
};

export default Checkout;
