import React from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
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
  MenuItem
} from "@mui/material";

const Checkout = () => {
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
              Checkout
            </Link>
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
            <Grid xs={12} p={1} md={6}>
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
                <Grid container rowSpacing={2} columnSpacing={1}>
                  <Grid item xs={12} sm={6}>
                    <div>
                      <TextField
                        label="first name"
                        id="outlined-size-small"
                        size="small"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div>
                      <TextField
                        label="last name"
                        id="outlined-size-small"
                        size="small"
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
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div>
                      <TextField
                        type="number"
                        label="Phone"
                        id="outlined-size-small"
                        size="small"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{width:211}}>
                      <InputLabel id="demo-simple-select-label">Country</InputLabel>
                      <Select
                      
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        
                        label="Country"
                        size="small"
                       
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div>
                      <TextField
                        label="Town/City"
                        id="outlined-size-small"
                        size="small"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div>
                      <TextField
                        label="Street Adress"
                        id="outlined-size-small"
                        size="small"
                      />
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid xs={12} p={1} md={6}>
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
                  <TableContainer component={Paper}>
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
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>1</TableCell>
                          <TableCell align="center">samsung 4</TableCell>
                          <TableCell align="center">3</TableCell>

                          <TableCell align="center">40000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography mt={2} variant="body1">
                    Total = 20000 Tsh
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Checkout;
