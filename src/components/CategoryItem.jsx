import { Grid, Paper } from '@mui/material';
import React from 'react';
const CategoryItem = ({img,title}) => {
    return (
      <>
        <Grid item xs={6} md={3}>
          <Paper sx={{ bgcolor: "rgba(32,36,40,0.9)", px: 3, py: 3 }} square>
            <img style={{ width: "100%" }} src={img} alt="pc img" />
          </Paper>
          <Paper sx={{ p: 2 }}>
            <h6 className="text-primary mt-3">{title}</h6>
          </Paper>
        </Grid>
      </>
    );
}
 
export default CategoryItem;