import { Box, Button, Grid, IconButton, Paper, Rating, Stack, Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import img from "../images/chels.jpg";
import img1 from "../images/bg1.jpg";
import img2 from "../images/bg2.jpg";
import React,{useEffect, useState} from "react";
import { ShoppingCart, Star } from "@mui/icons-material";
import { useSelector } from "react-redux";
const WeeklyOffer = () => {
  const [value,setValue] = useState(2.5)
  const { products } = useSelector((state) => state.products.products);
       let newPrice=444;
       let product = {
         title: "samsung 4",
         price: "500000",
         description: "the best in town at the moment",
         category: "the best category for the best phone",
         images: ["http://localhost:5000/uploads/83830033.jpg", 343],
       };
      let index = products.length - 1;
      if(products.length > 0){

        product = products[index];
        newPrice = product.price -  Math.ceil(30/100 * product.price);
      }

     
    if(products.length > 0){
      return (
        <>
          <Box
            className="weeklyOfferr"
            sx={{
              width: "100%",
              p: 4,
            }}
          >
            <Button
              sx={{ color: "#51a2df", mb: 3, fontSize: 24 }}
              size="large"
              startIcon={<DoubleArrowIcon />}
            >
              Weekly Offer
            </Button>
    
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    background: "linear-gradient(to top right,#9cdcfe,#1976c8)",
                    px: 3,
                    py: 3,
                    height: "100%",
                  }}
                  square
                >
                  <center>
                    <Typography
                      variant="h5"
                      sx={{ color: "#e5e5e5", textShadow: "1px 1px 7px #faaf00" }}
                    >
                      {product.title}
                    </Typography>
                  </center>
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="body"
                      sx={{ color: "#5b5b5b", display: "block" }}
                    >
                      {product.description}
                    </Typography>
    
                    <Button
                      sx={{
                        color: "#f4524f",
                        fontSize: 14,
                        mt: 1,
                        textDecoration: "line-through",
                      }}
                      size="small"
                      startIcon={<DoubleArrowIcon />}
                    >
                      {product.price.toLocaleString()}{" "}
                      <span style={{ color: "#df9c00" }}> &nbsp;Tsh</span>
                    </Button>
                    <br />
                    <Button
                      sx={{
                        color: "#5b5b5b",
                        fontSize: 14,
                      }}
                      size="small"
                      startIcon={<DoubleArrowIcon />}
                    >
                      {newPrice.toLocaleString()} Tsh
                    </Button>
    
                    <Stack spacing={2} sx={{ my: 2 }} direction="row">
                      <IconButton
                        sx={{
                          bgcolor: "#5aa8e3",
                          "&:hover": { bgcolor: "#2e87d1" },
                        }}
                        aria-label="whishlist"
                      >
                        <Star sx={{ color: "#f4524f" }} />
                      </IconButton>
    
                      <IconButton
                        sx={{
                          bgcolor: "#5aa8e3",
                          "&:hover": { bgcolor: "#2e87d1" },
                        }}
                        aria-label="whishlist"
                      >
                        <ShoppingCart sx={{ color: "#f4524f" }} />
                      </IconButton>
                    </Stack>
                    <Rating
                      size="large"
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ bgcolor: "#51a2df", px: 3, py: 3 }} square>
                  <img style={{ width: "100%" }} src={product.images[0]} alt="pc img" />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    }else{
      return <center>loading product</center>

    }

    
};;

export default WeeklyOffer;
