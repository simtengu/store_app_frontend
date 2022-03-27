import React,{useState} from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import SideBarItem from "./SideBarItem";
import img from "../../images/chels.jpg";
import img1 from "../../images/bg1.jpg";
import img2 from "../../images/bg2.jpg";
import img3 from "../../images/1.jpg";
import TrendingItem from "./TrendingItem";
import { categories, tags } from "../../resources/productData";
import { useNavigate } from "react-router-dom";
 import axios from "../../api";
import { useDispatch } from "react-redux";
import { setFilteredProducts } from "../../store/actions/products";
const SideBar = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();
const [isLoading,setIsLoading] = useState(false);

  const handleCategory = async (category)=>{
try {
  setIsLoading(true)
  const rs = await axios.get(`/products/filtered?category=${category}`);
  const rsData = await rs.data;
  const foundProducts = rsData.products;
  setIsLoading(false)
  if (foundProducts.length > 0) {
    const payload = {
      products: foundProducts,
      category: {
        name: "category",
        value: category,
      }
    };
   dispatch(setFilteredProducts(payload));
   navigate('/products/filtered')
  
  }else{
 alert("sorry we couldn't find any products for you")
  }
} catch (error) {
  console.log(error)
}
  }

//handle filter by tags ....................
   const handleTag = async (tag) => {
     try {
       setIsLoading(true);
       const rs = await axios.get(`/products/filtered?tag=${tag}`);
       const rsData = await rs.data;
       const foundProducts = rsData.products;
       setIsLoading(false);
       if (foundProducts.length > 0) {
         const payload = {
           products: foundProducts,
           category: {
             name: "Tag",
             value: tag,
            },
          };
          dispatch(setFilteredProducts(payload));
          navigate("/products/filtered");
        } else {
          alert("sorry we couldn't find any products for you");
        }
      } catch (error) {
       setIsLoading(false);
       console.log(error);
     }
   };
  
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={() => setIsLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Item" />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Divider sx={{ mt: 2 }} orientation="horizontal" />
      <SideBarItem title="Categories">
        <List>
          {categories.map((category, index) => {
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{ py: 0, my: 0 }}
                  onClick={() => handleCategory(category)}
                >
                  <ListItemText primary={category} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </SideBarItem>
      <Divider />
      <SideBarItem title="Product Tags">
        <div className="tagsDiv">
          
          {tags.map((tag,index)=> <Button onClick={()=>handleTag(tag)} key={index}>{tag}</Button>)}
        </div>
      </SideBarItem>

      <SideBarItem title="Trending Products">
        <Grid container rowSpacing={0.5}>
          <TrendingItem
            title="Samsung Galaxy"
            price="200000"
            img={img}
            category="phone"
          />
          <TrendingItem
            title="Tecno Camon X"
            price="50000"
            img={img3}
            category="phone"
          />
          <TrendingItem
            title="Fifa 2022"
            price="20020"
            img={img2}
            category="Games"
          />
          <TrendingItem
            title="Flat Screen Tv"
            price="20020"
            img={img1}
            category="Electronics"
          />
        </Grid>
      </SideBarItem>
    </>
  );
};

export default SideBar;
