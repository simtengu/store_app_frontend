import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "../api"
import { setFilteredProducts } from '../store/actions/products';
const CategoryItem = ({img,title}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setIsLoading] = useState(false);
    const handleCategory = async () => {
      let category  = title;
      try {
        setIsLoading(true);
        const rs = await axios.get(`/products/filtered?category=${category}`);
        const rsData = await rs.data;
        const foundProducts = rsData.products;
        setIsLoading(false);
        if (foundProducts.length > 0) {
          const payload = {
            products: foundProducts,
            category: {
              name: "category",
              value: category,
            },
          };
          dispatch(setFilteredProducts(payload));
          navigate("/products/filtered");
        } else {
          alert("sorry we couldn't find any products for you");
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>
        <Grid item xs={6} md={3}>
          <Box
            sx={{ "&:hover": { boxShadow: "1px 1px 3px #768cff" } }}
            onClick={handleCategory}
          >
            <Paper
              className="categoryItem"
              sx={{ bgcolor: "rgba(32,36,40,0.9)", px: 3, py: 3 }}
              square
            >
              <img style={{ width: "100%" }} src={img} alt="pc img" />
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography sx={{mt:3}}  color="primary">{title}</Typography>
            </Paper>
          </Box>
        </Grid>
      </>
    );
}
 
export default CategoryItem;