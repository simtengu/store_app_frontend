import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import HeadingOne from "../HeadingOne";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchSystemProducts,
} from "../../store/actions/products";
const AdminProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProduct] = useState("");
  const dispatch = useDispatch();

  //products............
  const { systemProducts } = useSelector((state) => state.products);

  useEffect(() => {
    let getProducts = async () => {
      try {
        await dispatch(fetchSystemProducts());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error.response.status === 401) {
          alert("Authentication error....... t");
        } else {
          alert("something went wrong...try again later");
        }
      }
    };
    getProducts();
  }, [systemProducts]);

  const handleProductDelete = async () => {
    setIsDialogOpen(false);
    try {
      setIsLoading(true);
      await dispatch(deleteProduct(selectedProductId));
      setIsLoading(false);
      setSelectedProduct("");
    } catch (error) {
      setSelectedProduct("");
      setIsLoading(false);
      alert("something went wrong ... try again later");
    }
  };
  //delete dialog logic..................
  const handleOpenDialog = (id) => {
    setSelectedProduct(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedProduct("");
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={() => setIsLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (systemProducts && systemProducts.length > 0) {
    return (
      <>
        {/* delete product dialog................................... */}
        <div>
          <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are sure you want to delete this product
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Disagree</Button>
              <Button onClick={handleProductDelete}>Agree</Button>
            </DialogActions>
          </Dialog>
        </div>
        {/* end of delete product dialog................................... */}

        <Box className="adminProductsDiv" px={1} mt={1}>
          <HeadingOne title="Products" />
          <Grid container columnSpacing={1} rowSpacing={1}>
            {/* product component........................... */}
            {systemProducts.map((product) => {
              return (
                <Grid key={product._id} item xs={6} sm={4} md={3} lg={2}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      image={product.images[0]}
                    />
                    <CardContent sx={{ pt: 1, pb: 0 }}>
                      <Typography variant="caption">
                        {product.title.substring(0, 17)}{" "}
                        {product.title.length > 17 ? ".." : ""}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        value="testing value"
                        onClick={() => console.log('yeah')}
                        aria-label="edit"
                      >
                        <Edit sx={{ color: "#f7bb09" }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleOpenDialog(product._id)}
                      >
                        <DeleteOutline sx={{ color: "#ff2d2d" }} />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}

            {/* end of product component........................... */}
          </Grid>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box className="adminProductsDiv" px={1} mt={1}>
          <center>No products</center>
        </Box>
      </>
    );
  }
};

export default AdminProducts;
