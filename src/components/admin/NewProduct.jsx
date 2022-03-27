import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Container,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Slide,
  Alert as MuiAlert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { AddAPhoto, Save } from "@mui/icons-material";
import { tags, categories,brands } from "../../resources/productData";
import axios from "../../api/secureApi";
import { addNewProduct } from "../../store/actions/products";
import { useDispatch } from "react-redux";


function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewProduct = () => {
  const dispatch = useDispatch();
  let initialProductState = {
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
  };

  //tag checkboxes initial state..................
  const tagsInfo = tags.map((tag) => {
    return { name: tag, checked: false };
  });
  //tags............ 
  const [allTags,setAllTags] = useState(tagsInfo);
  const [newProductInfo, setNewProductInfo] = useState(initialProductState);
  const [productTags, setProductTags] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [imgSelectionError, setImgSelectionError] = useState(false);

  //temporary image b4 uploading..........
  const [tempImage, setTempImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  //isloading.................
   const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async () => {
    if (!tempImage) {
      setImgSelectionError("You have not selected the image to upload...");
      setTimeout(() => {
        setImgSelectionError("");
      }, 4000);
      return;
    }

    //image has been selected ......upload
    let data = new FormData();
    data.append("picha", selectedImage);
  
    try {
      setIsLoading(true)
      let rs = await axios.post("image/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      let responseData = await rs.data;
      let imgPath = "http://localhost:5000/" + responseData.path;

      let newProductImagesList = productImages.concat([imgPath]);
      setProductImages(newProductImagesList);
      setTempImage("");
      setSelectedImage("");
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setTempImage("");
      setSelectedImage("");
      setImgSelectionError(error.response.data.message);
      setTimeout(() => {
        setImgSelectionError("");
      }, 8000);
    }
  };

  const updateProductInfo = (e) => {
    const fieldName = e.target.name;
    const newValue = e.target.value;

    setNewProductInfo({ ...newProductInfo, [fieldName]: newValue });
  };

  const handleTagsSelection = (event) => {
    const selectedTag = event.target.value;

    const tag = allTags.find((tag) => {
      return tag.name == selectedTag;
    });

     const tagIndex = allTags.findIndex((tag) => {
       return tag.name == selectedTag;
     }); 

    if (tag.checked) {
      //a tag has been unchecked ......... removing from product tags list
      let newProductTags = productTags.filter((tag) => tag != selectedTag);
      setProductTags(newProductTags);
      console.log(productTags);
    } else {
      // a tag has been checked ........... adding into the product tags list
      let newTagArray = [selectedTag];
      let newProductTags = productTags.concat(newTagArray);
      setProductTags(newProductTags);
    }

    //updating check status of a specific tag
    const newTagInfo = { ...tag, checked: !tag.checked };
    const prevTagsInfo = allTags;
    prevTagsInfo[tagIndex] = newTagInfo;
    const newAllTagsInfo = prevTagsInfo;
    setAllTags(newAllTagsInfo);
  };

  //handling response state(feedback)........
  const [feedback, setFeedback] = useState({
    message: "",
    status: "error",
    isActive: false,
  });
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    //primary validation.......................
    if (productImages.length < 1) {
      setFeedback({
        message: "upload atleast one image",
        status: "error",
        isActive: true,
      });
      return;
    }

    if (
      newProductInfo.category === "" ||
      newProductInfo.title === "" ||
      newProductInfo.description === "" ||
      newProductInfo.price === ""
    ) {
      setFeedback({
        message: "Please make sure you have filled all inputs",
        status: "error",
        isActive: true,
      });
      return;
    }

    let productData = {
      ...newProductInfo,
      tags: productTags,
      images: productImages,
    };
    console.log(productData);

    //submitting the product.........
    try {
      setIsLoading(true);
       await dispatch(addNewProduct(productData));
      setIsLoading(false);

      //setting feedback
      setFeedback({
        message: "A product has been successful created",
        status: "success",
        isActive: true,
      });
      //reseting new product state................
      setNewProductInfo(initialProductState);
      setProductTags([]);
      setProductImages([]);
      setTempImage("");
      setSelectedImage("");
      setAllTags(tagsInfo);
      
    } catch (error) {
      setIsLoading(false);
      setFeedback({
        message: error.response.data.message,
        status: "error",
        isActive: true,
      });
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Container>
        {/* feedbacks section................................ */}

        <Snackbar
          open={feedback.isActive}
          autoHideDuration={6000}
          onClose={() => setFeedback({ ...feedback, isActive: false })}
          TransitionComponent={SlideTransition}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            onClose={() => setFeedback({ ...feedback, isActive: false })}
            severity={feedback.status}
            sx={{ width: "100%" }}
          >
            {feedback.message}
          </Alert>
        </Snackbar>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={() => setIsLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* end of feedbacks section............................. */}

        <Box
          component="form"
          className="billingForm"
          sx={{
            border: "1px solid #c4c4c4",
            p: 4,
            borderRadius: 2,
          }}
          autoComplete="off"
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                color="primary"
                sx={{ fontWeight: 500 }}
                variant="h6"
                mb={2}
                gutterBottom
              >
                Create new Product
              </Typography>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Box sx={{ width: { xs: "100%", md: "90%", lg: "75%" } }}>
                <div>
                  <TextField
                    label="Product Title"
                    id="title"
                    size="normal"
                    margin="normal"
                    fullWidth
                    name="title"
                    value={newProductInfo.title}
                    onChange={updateProductInfo}
                  />
                </div>

                <div>
                  <TextField
                    select
                    label="Product Category"
                    size="normal"
                    margin="normal"
                    name="category"
                    fullWidth
                    value={newProductInfo.category}
                    onChange={updateProductInfo}
                  >
                    {categories.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div>
                  <TextField
                    select
                    label="Product Brand"
                    size="normal"
                    margin="normal"
                    name="brand"
                    fullWidth
                    value={newProductInfo.brand}
                    onChange={updateProductInfo}
                  >
                    {brands.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>


                <div style={{ marginTop: "11px" }}>
                  <Typography>Tags for a Product</Typography>
                  <div className="tagsDiv">
                    {allTags.map((option, index) => {
                      return (
                        <div key={index} className="tagWrapper">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={option.name}
                                value={option.name}
                                onChange={handleTagsSelection}
                                checked={option.checked}
                              />
                            }
                            label={option.name}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <TextField
                    label="Product Description"
                    multiline
                    fullWidth
                    minRows={4}
                    size="normal"
                    margin="normal"
                    name="description"
                    value={newProductInfo.description}
                    onChange={updateProductInfo}
                  />
                </div>

                <div>
                  <TextField
                    type="number"
                    label="Product Price (Tsh)"
                    size="normal"
                    margin="normal"
                    fullWidth
                    name="price"
                    value={newProductInfo.price}
                    onChange={updateProductInfo}
                  />
                </div>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              sx={{ marginTop: { xs: 4, md: 0 } }}
            >
              {tempImage ? (
                <div>
                  <img
                    style={{ width: "220px", height: "auto" }}
                    src={tempImage}
                  />
                  <div
                    style={{
                      padding: "5px",
                      width: "220px",
                      backgroundColor: "#c8e0f9",
                    }}
                  >
                    <label
                      style={{
                        margin: "3px 0px",
                        color: "#2686e6",
                        width: "100%",
                      }}
                      htmlFor="product_image"
                    >
                      {" "}
                      <AddAPhoto /> change image
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="product_image">
                    <div className="addImageContainer">
                      <AddAPhoto fontSize="large" sx={{ color: "#1976d2" }} />
                      <Typography
                        variant="caption"
                        sx={{ color: "#1976d2", mt: 2 }}
                      >
                        Select Product Image
                      </Typography>
                    </div>
                  </label>
                </div>
              )}

              <input
                type="file"
                id="product_image"
                onChange={(e) => {
                  setTempImage(URL.createObjectURL(e.target.files[0]));
                  setSelectedImage(e.target.files[0]);
                }}
                style={{ display: "none" }}
                accept="image/*"
              />
              <Typography
                variant="caption"
                sx={{ display: "block" }}
                gutterBottom
              >
                Image size must not exceed{" "}
                <span style={{ fontWeight: "bold" }}>3MBs</span> ,allowed image
                formats are jpg and png only,use a{" "}
                <span style={{ fontWeight: "bold" }}>square shaped </span>
                image ( with 1:1 ratio for better display)
              </Typography>
              <Button onClick={handleImageUpload} variant="outlined">
                upload Image
              </Button>
              <br />
              {imgSelectionError && (
                <Typography color="error" variant="caption">
                  {imgSelectionError}
                </Typography>
              )}

              {/* uploaded images flexbox */}
              {productImages.length > 0 ? (
                <Grid container spacing={2} mt={2}>
                  {productImages.map((path, index) => {
                    return (
                      <Grid key={index} item xs={4} md={6}>
                        <img
                          src={path}
                          style={{ width: "97%", height: "auto" }}
                          alt="product image"
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                ""
              )}

              {/* end of uploaded images flexbox */}
            </Grid>
          </Grid>
          <Button
            variant="contained"
            size="large"
            startIcon={<Save />}
            sx={{ mt: 4 }}
            onClick={handleProductSubmit}
          >
            Save
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default NewProduct;
