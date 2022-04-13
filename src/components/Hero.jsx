import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activate_register_form } from "../store/actions/authForms";

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Box
        style={{
          backgroundImage: `url(./bg2.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
        }}
      >
        <Box
          sx={{
            minWidth: "100%",
            minHeight: "100%",
            backgroundColor: "rgba(212,212,212,0.5)",
          }}
        >
          <Container>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box sx={{ my: 11 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Welcome to{" "}
                    <span style={{ color: "#2f87ce" }}>SimpleShopApp</span>
                  </Typography>
                  <Typography
                    style={{ fontSize: "20px", fontWeight: 450 }}
                    gutterBottom
                  >
                    with simpleShopApp you can easly find products that you like
                    through multiple product filters available and manage them
                    confortably through a cart feature.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: 20 }}
                    onClick={() => {
                      dispatch(activate_register_form());
                      navigate("/auth");
                    }}
                  >
                    Join Us
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Hero;
