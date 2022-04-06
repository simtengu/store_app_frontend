
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Container,
  Grid,
  Paper,
  Box,
  IconButton,
  Divider,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider
} from "@mui/material";
import * as React from "react";
import computer from "../images/lenovo.jpg";
import phone from "../images/3.jpg";

 
import CategoryItem from "./CategoryItem";
import MainTitle from "./MainTitle";
const BestCategories = () => {


  return (
    <>
      <MainTitle title="Best Categories" />
      <Grid container spacing={5}>
        <CategoryItem img={computer} title="computers" />
        <CategoryItem img={phone} title="clothes" />
        <CategoryItem img={phone} title="phones" />
        <CategoryItem img={computer} title="shoes" />
      </Grid>
    </>
  );
};

export default BestCategories;
