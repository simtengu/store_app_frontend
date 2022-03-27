import { Box, CardMedia, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
const TrendingItem = (props) => {
    const {img,title,price,category} = props;
    return (
      <>
        <Grid item xs={6} md={12}>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  sx={{ width: "100%" }}
                  image={img}
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
                    {price} Tsh
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
        </Grid>
      </>
    );
}
 
export default TrendingItem;