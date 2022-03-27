import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <Container>
          <Grid container rowSpacing={2} columnSpacing={4}>
            <Grid item xs={12} sm={12} md={3}>
              <Typography
                sx={{ color: "#2f87d1", fontWeight: "bolder" }}
                variant="h4"
                gutterBottom
              >
                Shop<span style={{ color: "#dd9b00" }}>App</span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Store app is Lorem ipsum dolor sit amet con harum, earum odit.
                Minima, repellat?
              </Typography>
              <Stack sx={{ mt: 1 }} direction="row" spacing={2}>
                <Instagram sx={{ color: "#f574b8" }} />
                <Facebook sx={{ color: "#252be9" }} />
                <Twitter sx={{ color: "#7fc6f2" }} />
                <LinkedIn sx={{ color: "#2f87d1" }} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className="links">
                <h5>Important Links</h5>
                <ul>
                  <li>home</li>
                  <li>accounts</li>
                  <li>contact us</li>
                </ul>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <div className="links">
                <h5>My Account</h5>
                <ul>
                  <li>home</li>
                  <li>accounts</li>
                  <li>contact us</li>
                </ul>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <div className="links">
                <h5>Categories</h5>
                <ul>
                  <li>home</li>
                  <li>accounts</li>
                  <li>contact us</li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Footer;
