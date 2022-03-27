import { Card, Grid, Paper } from '@mui/material';
import React from 'react';
import HeadingOne from '../HeadingOne';

const UsersOrders = () => {
    return (
      <>
        <HeadingOne title="Recieved Orders" />
        <Grid container rowSpacing={2} columnSpacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <h3>order heading</h3>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <h3>order heading</h3>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <h3>order heading</h3>
            </Card>
          </Grid>
        </Grid>
      </>
    );
}
 
export default UsersOrders;