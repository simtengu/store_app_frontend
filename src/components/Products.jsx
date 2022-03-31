import React, { useEffect, useState } from "react";
import { Grid, Pagination, Skeleton } from "@mui/material";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/products";
import Filters from "./Filters";
import HorizontalProduct from "./HorizontalProduct";
const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeProductLayout, setActiveProductLayout] = useState("vertical");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {
    products: { products, count },
  } = useSelector((state) => state.products);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchProducts(page));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchItems();
  }, [page]);
  let skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const openVerticalProducts = () => {
    setActiveProductLayout("vertical");
  };

  const openHorizontalProducts = () => {
    setActiveProductLayout("horizontal");
  };

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
      <Filters
        onOpenVerticalProducts={openVerticalProducts}
        onOpenHorizontalProducts={openHorizontalProducts}
      />
      {activeProductLayout === "vertical" ? (
        <Grid container columnSpacing={1} rowSpacing={1}>
          {products &&
            products.map((item) => {
              return <Product key={item._id} product={item} />;
            })}
        </Grid>
      ) : (
        <Grid container columnSpacing={1} rowSpacing={1}>
          {products &&
            products.map((item) => {
              return <HorizontalProduct key={item._id} product={item} />;
            })}
        </Grid>
      )}

      {count > 16 && (
        <div className="paginationDiv">
          <Pagination
            variant="outlined"
            shape="rounded"
            page={page}
            color="primary"
            count={Math.ceil(count / 16)}
            onChange={(event, value) => {
              setPage(value);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Products;
