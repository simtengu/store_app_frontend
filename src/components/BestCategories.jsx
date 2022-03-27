
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
import img from "../images/img.png";
import img1 from "../images/img1.png";

 
import CategoryItem from "./CategoryItem";
import MainTitle from "./MainTitle";
const BestCategories = () => {


  return (
    <>
       
        <MainTitle title="Best Categories" />
        <Grid container spacing={5}>
          <CategoryItem img={img} title="Clothes" />
          <CategoryItem img={img1} title="Electronics" />
          <CategoryItem img={img} title="Video Games" />
          <CategoryItem img={img1} title="Home Equipments" />
        </Grid>
      
    </>
  );
};

export default BestCategories;
