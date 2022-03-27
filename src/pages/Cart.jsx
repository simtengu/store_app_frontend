import React from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
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
  ButtonGroup,
  Button,
} from "@mui/material";
import img1 from "../images/12.jpg";
import img2 from "../images/chels.jpg";
import img3 from "../images/xboxx.jpg";
import img4 from "../images/12.jpg";
import img5 from "../images/chl.jpg";
import SideBar from "../components/sidebar/SideBar";
import {
  AddShoppingCart,
  ArrowLeft,
  ArrowRight,
  Send,
  Share,
  Star,
} from "@mui/icons-material";

function createData(img, calories, fat, carbs, protein) {
  return { img, calories, fat, carbs, protein };
}

const rows = [
  createData(img1, 159, 6.0, 24, 4.0),
  createData(img2, 237, 9.0, 37, 4.3),
  createData(img3, 262, 16.0, 24, 6.0),
  createData(img4, 305, 3.7, 67, 4.3),
  createData(img5, 356, 16.0, 49, 3.9),
];

const Cart = () => {
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
              Cart
            </Link>
          </Breadcrumbs>
        </Box>

        <Grid container rowSpacing={2} spacing={2}>
          <Grid item md={9}>
            <Box my={2}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bolder", textTransform: "uppercase" }}
              >
                Shopping Cart
              </Typography>
              <div className="underline1"></div>

              <Box sx={{ width: { md: "95%", lg: "90%" } }} mt={4}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>&nbsp;</TableCell>
                        <TableCell align="center">Product</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Total (Tsh)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <img width="70" alt="cart img" src={row.img} />
                          </TableCell>
                          <TableCell align="center">{row.calories}</TableCell>
                          <TableCell align="center">{row.fat}</TableCell>
                          <TableCell align="center">
                            <Stack
                              direction="row"
                              class="cartControls"
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
                          </TableCell>
                          <TableCell align="center">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box
                sx={{
                  display: "inline-block",
                  bgcolor: "#ffd064",
                  p: 2,
                  mt: 3,
                  borderRadius: 4,
                }}
              >
                <Typography sx={{ my: 2 }} variant="h6" gutterBottom>
                  Total Amount : 50000 Tsh
                </Typography>

                <Button
                  mt={2}
                  sx={{
                    color: "black",
                    border: "1px solid white",
                    bgcolor: "white",
                    '&:hover':{
                        bgcolor:'black',
                        color:'white',
                        border:'1px solid black'
                    }
                  }}
                  variant="contained"
                  endIcon={<Send />}
                >
                  CheckOut
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item md={3}>
            <SideBar />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cart;
