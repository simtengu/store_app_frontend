import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import img from "../images/login.jpg";
const NotFound = () => {
  return (
    <>
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Box>
              <img style={{ width: "96%" }} src={img} alt="not found" />
              <center>
                <Link to="/">
                      <Button
                  color="primary"
                  variant="outlined"
                  size="large"
                  sx={{ borderRadius: 4 }}
                >
                  back home
                </Button>          
                </Link>

              </center>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NotFound;
