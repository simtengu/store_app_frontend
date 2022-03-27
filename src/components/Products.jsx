import React, { useEffect, useState } from "react";
import { Grid, Pagination, Skeleton } from "@mui/material";
import Product from "./Product";
import img2 from "../images/chels.jpg";
import img3 from "../images/xboxx.jpg";
import img4 from "../images/12.jpg";
import img5 from "../images/chl.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/products";
import Filters from "./Filters";
const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        await dispatch(fetchProducts());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchItems();
  }, []);
  let skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  if (isLoading) {
    return (
      <>
        <Grid container columnSpacing={1} rowSpacing={1}>
          {skeletons.map((skl) => {
            return (
              <Grid key={skl} item xs={6} sm={4} md={3}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={125}
                />
                <Skeleton />
                <Skeleton width="60%" />
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
  return (
    <>
    <Filters />
      <Grid container columnSpacing={1} rowSpacing={1}>
        {products &&
          products.map((item) => {
            return <Product key={item._id} product={item} />;
          })}
      </Grid>
      <div className="paginationDiv">
        <Pagination
          variant="outlined"
          shape="rounded"
          count={10}
          color="primary"
        />
      </div>
    </>
  );
};

export default Products;
