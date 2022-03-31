import { Apps, Article, DensitySmall } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useReducer, useEffect } from "react";
import { brands, categories, orderBys, tags } from "../resources/productData";
import axios from "../api";
import { setFilteredProducts } from "../store/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Filters = (props) => {
  const { onOpenVerticalProducts, onOpenHorizontalProducts } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    filteredProducts: { category },
  } = useSelector((state) => state.products);
  const [orderBy, setOrderBy] = useState(category.value);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [fCategory, setFCategory] = useState("");
  const [fBrand, setFBrand] = useState("");
  const [fSort, setFSort] = useState("Latest First");


  //handle tags selection.....
  const handleTagSelection = (e) => {
    let tag = e.target.value;
    if (selectedTags.includes(tag)) {
      //remove the tag
      let newTagsList = selectedTags.filter((item) => item !== tag);
      setSelectedTags(newTagsList);
      return;
    }
    setSelectedTags(selectedTags.concat([tag]));
  };
  //handle custom products filter..................
  const handleCustomFilter = async () => {

    setIsDialogOpen(false);
    //sort products....
    let sort;
    if (fSort === "Latest First") {
      sort = "latest";
    }

    if (fSort === "Old First") {
      sort = "old";
    }

    if (fSort === "Cheap First") {
      sort = "cheap";
    }
    if (fSort === "Expensive First") {
      sort = "expensive";
    }

    if (fSort === "Category") {
      sort = "category";
    }

    if (fSort === "Brand") {
      sort = "brand";
    }

    let filterString = `?sort=${sort}`;
    //price range check....
    if (minPrice && maxPrice) {
      filterString += `&range=${minPrice},${maxPrice}`;
    } else {
      if (minPrice) {
        filterString += `&greater=${minPrice}`;
      }
      if (maxPrice) {
        filterString += `&less=${maxPrice}`;
      }
    }

    //product tags check..................
    if (selectedTags.length > 0) {
      let tgs = selectedTags.join(",");
      filterString += `&tag=${tgs}`;
    }

    //product category check........
    if (fCategory) {
      filterString += `&category=${fCategory}`;
    }

    //product brand check.......
    if (fBrand) {
      filterString += `&brand=${fBrand}`;
    }

    //fetching product from api basing on filters set...........
    try {
      setIsLoading(true);
      const rs = await axios.get(`/products/filtered${filterString}`);
      const rsData = await rs.data;
      const foundProducts = rsData.products;
      setIsLoading(false);

      const payload = {
        products: foundProducts,
        category: {
          name: "Filtered",
          value: "Custom Filter",
        }
      };
      dispatch(setFilteredProducts(payload));
      navigate("/products/filtered");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  //handle orderby........
  const handleOrderBy = async (event) => {

   let value = event.target.value;
    setOrderBy(value);
    let sort;
    if (value === "Latest First") {
      sort = "latest";
    }

    if (value === "Old First") {
      sort = "old";
    }

    if (value === "Cheap First") {
      sort = "cheap";
    }
    if (value === "Expensive First") {
      sort = "expensive";
    }

    if (value === "Category") {
      sort = "category";
    }

    if (value === "Brand") {
      sort = "brand";
    }

    try {
      setIsLoading(true);
      const rs = await axios.get(
        `/products/filtered?sort=${sort}`
      );
      const rsData = await rs.data;
      const foundProducts = rsData.products;
      setIsLoading(false);

      const payload = {
        products: foundProducts,
        category: {
          name: "Sorted",
          value,
        }
      };
      dispatch(setFilteredProducts(payload));
      navigate("/products/filtered");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handlePriceRange = (event, newValue) => {
    setPriceRange(newValue);
    setMinPrice(newValue[0] * 10000);
    setMaxPrice(newValue[1] * 10000);
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
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", minHeight: 335 } }}
        maxWidth="md"
        fullWidth={true}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <DialogTitle>Filter Products</DialogTitle>
        <Divider sx={{ padding: 0, margin: 0 }} />
        <DialogContent sx={{ py: 0 }}>
          <Typography variant="caption" sx={{ color: "#d79600" }}>
            (combine filters anyway you want)
          </Typography>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bolder", mt: 1, mb: 0.3 }}
              >
                By Price Range
              </Typography>
              <div className="underline"></div>
              <div style={{ marginTop: 55 }}>
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={priceRange}
                    onChange={handlePriceRange}
                    step={5}
                    valueLabelDisplay="off"
                    sx={{ ml: 1 }}
                  />
                  <div className="priceInputsDiv">
                    <div className="priceDiv">
                      <label htmlFor="minPrice">From</label>
                      <input
                        type="number"
                        value={minPrice}
                        min="1"
                        onChange={(e) => {
                          setMinPrice(e.target.value);
                          setPriceRange([0, 0]);
                        }}
                        id="minPrice"
                      />
                    </div>
                    <div style={{ marginLeft: 20 }} className="priceDiv">
                      <label htmlFor="maxPrice">To</label>
                      <input
                        type="number"
                        value={maxPrice}
                        min="1"
                        onChange={(e) => {
                          setMaxPrice(e.target.value);
                          setPriceRange([0, 0]);
                        }}
                        id="maxPrice"
                      />
                    </div>
                  </div>
                </Box>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ marginTop: "15px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bolder", mt: 1, mb: 0.3 }}
                >
                  By Product Tags
                </Typography>
                <div className="underline"></div>

                <div className="tagsDiv">
                  {tags.map((option, index) => {
                    return (
                      <div key={index} className="tagWrapper">
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={option}
                              checked={selectedTags.includes(option)}
                              value={option}
                              onClick={handleTagSelection}
                            />
                          }
                          label={option}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div style={{ marginTop: "15px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bolder", mt: 1, mb: 0.3 }}
                >
                  By Category
                </Typography>
                <div className="underline"></div>
                <TextField
                  select
                  label="Product Category"
                  size="normal"
                  margin="normal"
                  name="category"
                  sx={{ minWidth: "200px" }}
                  value={fCategory}
                  onChange={(e) => setFCategory(e.target.value)}
                >
                  <MenuItem value="">Any Category</MenuItem>
                  {categories.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ marginTop: "15px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bolder", mt: 1, mb: 0.3 }}
                >
                  By Brand
                </Typography>
                <div className="underline"></div>
                <TextField
                  select
                  label="Product Brand"
                  size="normal"
                  margin="normal"
                  name="brand"
                  sx={{ minWidth: "200px" }}
                  value={fBrand}
                  onChange={(e) => setFBrand(e.target.value)}
                >
                  <MenuItem value="">Any Brand</MenuItem>
                  {brands.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ marginTop: "15px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bolder", mt: 1, mb: 0.3 }}
                >
                  Sort Products
                </Typography>
                <div className="underline"></div>
                <TextField
                  select
                  label="Product Brand"
                  size="normal"
                  margin="normal"
                  name="brand"
                  sx={{ minWidth: "200px" }}
                  value={fSort}
                  onChange={(e) => setFSort(e.target.value)}
                >
                  {orderBys.map((order, index) => {
                    return (
                      <MenuItem key={index} value={order}>
                        {order}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider sx={{ padding: 0, margin: 0 }} />
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCustomFilter}
          >
            Ok
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mb: 2 }} id="filtersContainer">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box id="orderByContainer" sx={{ mr: 1 }}>
            <Stack alignItems="center" direction="row">
              <div id="orderTxt">
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    color: "#e2e2e2",
                    mr: 1,
                    fontSize: 14,
                  }}
                >
                  Order by:
                </Typography>
              </div>
              <div>
                <select value={orderBy} name="orderBy" onChange={handleOrderBy}>
                  {orderBys.map((order, index) => {
                    return (
                      <option key={index} value={order}>
                        {order}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Stack>
          </Box>
          <Box id="filtersBtnDiv">
            <button onClick={() => setIsDialogOpen(true)}>
              Filter Products
            </button>
          </Box>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <IconButton
              onClick={onOpenVerticalProducts}
              sx={{ backgroundColor: "#f4f5f7" }}
            >
              <Apps />
            </IconButton>
            <IconButton
              onClick={onOpenHorizontalProducts}
              sx={{ backgroundColor: "#f4f5f7" }}
            >
              <DensitySmall />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Filters;
