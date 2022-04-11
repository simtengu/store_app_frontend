import {
  Box,
  Button,
  Card,
  Grid,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HeadingOne from "../HeadingOne";
import axios from "../../api/secureApi";

const UsersOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [openedOrder, setOpenedOrder] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const rs = await axios.get("/orders");
        const all_orders = rs.data.orders;
        console.log(all_orders);
        setOrders(all_orders);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchOrders();
  }, []);
  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
          animation="wave"
        />

        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
          animation="wave"
        />
      </Box>
    );
  }

  return (
    <>
      <HeadingOne title="Recieved Orders" />
      {orders.length > 0 ? (
        <Grid
          container
          rowSpacing={2}
          columnSpacing={3}
          justifyContent="center"
        >
          <Grid item xs={12} sm={10} md={9}>
            {orders.map((order, index) => {
                       let date = new Date(order.createdAt);
              return (
                <Card
                  key={index}
                  elevation={1}
                  sx={{ bgcolor: "#ffdc8a", my: 1 }}
                >
                  <TableContainer component={Box}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Customer</TableCell>
                          <TableCell>Date Placed:</TableCell>
                          <TableCell align="left">Total Items</TableCell>
                          <TableCell align="left">Total Amount(Tsh)</TableCell>
                          <TableCell align="left">&nbsp;</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{`${order.owner.firstName} ${order.owner.lastName}`}</TableCell>
                          <TableCell align="left">{`${date.toDateString()}`}</TableCell>
                          <TableCell align="left">
                            {order.totalQuantity}
                          </TableCell>
                          <TableCell align="left">
                            {order.totalAmount.toLocaleString()}
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              onClick={() => {
                                setOpenedOrder(
                                  index === openedOrder ? "" : index
                                );
                              }}
                            >
                              view items
                            </Button>
                          </TableCell>
                        </TableRow>
                        {index === openedOrder &&
                          order.orderItems.map((item, idx) => {
                            return (
                              <TableRow key={idx}>
                                <TableCell>
                                  <img width="70" src={item.image} />
                                </TableCell>
                                <TableCell align="left">
                                  <Stack>
                                    <Typography>Title</Typography>
                                    <Typography variant="body2">
                                      {item.title}
                                    </Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell align="left">
                                  <Stack>
                                    <Typography>Price</Typography>
                                    <Typography variant="body2">
                                      {item.price &&
                                        item.price.toLocaleString()}{" "}
                                      (Tsh)
                                    </Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell align="left">
                                  <Stack>
                                    <Typography>Quantity</Typography>
                                    <Typography variant="body2">
                                      {item.quantity}
                                    </Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell align="left">
                                  <Stack>
                                    <Typography>Amount</Typography>
                                    <Typography variant="body2">
                                      {item.amount &&
                                        item.amount.toLocaleString()}{" "}
                                      (Tsh)
                                    </Typography>
                                  </Stack>{" "}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              );
            })}
          </Grid>
        </Grid>
      ) : (
        <center style={{ mt: 4 }}>THERE ARE NO ORDERS AT THE MOMENT</center>
      )}
    </>
  );
};

export default UsersOrders;
