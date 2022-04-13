import { MailOutline } from "@mui/icons-material";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
const Subscribe = () => {
  return (
    <>
      <Box sx={{ py: 3, px: 2, mt: 20, bgcolor: "#dd9b00" }}>
        <Grid alignItems="center" container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MailOutline sx={{ color: "white", fontSize: 28, mr: 1 }} />
              <Typography
                color="white"
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  p: 0,
                  m: 0,
                  fontSize: { xs: 15, sm: 23 },
                }}
              >
                Subscribe to our newsletter
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="subscribeForm"
            >
              <input
                type="email"
                style={{ fontFamily: "roboto", fontSize: 16 }}
                placeholder="enter your email"
              />
              <button style={{ fontFamily: "roboto", fontSize: 16 }}>
                subscribe
              </button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Subscribe;
