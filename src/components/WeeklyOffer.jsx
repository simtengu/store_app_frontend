import { Box, Button, Grid, IconButton, Paper, Rating, Stack, Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import img from "../images/chels.jpg";
import img1 from "../images/bg1.jpg";
import img2 from "../images/bg2.jpg";
import React,{useState} from "react";
import { Favorite, ShoppingCart, Star } from "@mui/icons-material";
const WeeklyOffer = () => {
  const [value,setValue] = useState(2.5)
  return (
    <>
      <Box
        className="weeklyOfferr"
        sx={{
          width: "100%",
          p: 4,
        }}
      >
        <Button
          sx={{ color: "#51a2df", mb: 3, fontSize: 24 }}
          size="large"
          startIcon={<DoubleArrowIcon />}
        >
          Weekly Offer
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                background: "linear-gradient(to top right,#9cdcfe,#1976c8)",
                px: 3,
                py: 3,
                height: "100%",
              }}
              square
            >
              <center>
                <Typography variant="h5" sx={{ color: "whitesmoke" }}>
                  Samsung galaxy 11
                </Typography>
              </center>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body"
                  sx={{ color: "grey", display: "block" }}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Doloribus vero sint voluptates corrupti voluptatibus
                  asperiores numquam. Unde t temporibus explicabo?
                </Typography>

                <Button
                  sx={{ color: "#f4524f", fontSize: 14, mt: 1 }}
                  size="small"
                  startIcon={<DoubleArrowIcon />}
                >
                  20,000 <span style={{ color: "#df9c00" }}> &nbsp;Tsh</span>
                </Button>
                <Stack spacing={2} sx={{ my: 2 }} direction="row">
                  <IconButton
                    sx={{
                      bgcolor: "#5aa8e3",
                      "&:hover": { bgcolor: "#2e87d1" },
                    }}
                    aria-label="whishlist"
                  >
                    <Star sx={{ color: "#f4524f" }} />
                  </IconButton>

                  <IconButton
                    sx={{
                      bgcolor: "#5aa8e3",
                      "&:hover": { bgcolor: "#2e87d1" },
                    }}
                    aria-label="whishlist"
                  >
                    <ShoppingCart sx={{ color: "#f4524f" }} />
                  </IconButton>
                </Stack>
                <Rating
                  size="large"
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ bgcolor: "#51a2df", px: 3, py: 3 }} square>
              <img style={{ width: "100%" }} src={img1} alt="pc img" />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default WeeklyOffer;
