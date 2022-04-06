import { Box, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const TrendingItem = ({ product }) => {
  const { images, title, price, category,_id } = product;
  return (
    <>
      <Grid item xs={12} >
        <Link id="productLink" to={`/product_details/${_id}`}>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  sx={{ width: "100%" }}
                  image={images[0]}
                  alt="trending img"
                />
              </Grid>
              <Grid item xs={8}>
                <Box sx={{ p: 0.5 }}>
                  <Typography
                    variant="body"
                    sx={{ color: "grey", fontWeight: "bold" }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "grey", display: "block" }}
                  >
                    {price.toLocaleString()} Tsh
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "#faaf00", display: "block" }}
                  >
                    {category}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Link>
      </Grid>
    </>
  );
};

export default TrendingItem;
