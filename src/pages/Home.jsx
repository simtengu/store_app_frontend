import { Container, Divider, Grid } from "@mui/material";
import React from "react";
import Hero from "../components/Hero"
import BestCategories from "../components/BestCategories"
import MainTitle from "../components/MainTitle";
import SideBar from "../components/sidebar/SideBar"
import Products from "../components/Products";
import WeeklyOffer from "../components/WeeklyOffer";
const Home = () => {
  return (
    <>
      <Hero />
      <Divider />
      <Container sx={{ mt: 16, mb: 5 }}>
        <BestCategories />
        <MainTitle title="Our Products" />
        <Grid container rowSpacing={2} spacing={2}>
          <Grid item md={9}>
            <Products />
            <WeeklyOffer />
          </Grid>
          <Grid item md={3}>
            <SideBar />
          </Grid>
        </Grid>
      </Container>
      
    </>
  );
};

export default Home;
