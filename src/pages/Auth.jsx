import { Box, Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import {
  activate_login_form,
  activate_register_form,
} from "../store/actions/authForms";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../store/actions/auth";
import axiosInstance from "../api/secureApi";

const Auth = () => {
  const token = localStorage.getItem("store_app_token");
  const [isLoading, setIsLoading] = useState(token ? true : false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeForm } = useSelector((state) => state.authForm);
  useEffect(() => {
    if (token) {
      //check if a token is still valid and fetch a user...............
      const fetchAuthUser = async () => {
        const response = await axiosInstance.get("/user");
        const { user } = response.data;
        if (user) {
          dispatch(setAuthUser(user));
          navigate("/", { replace: true });
        } else {
          setIsLoading(false);
        }
      };
      try {
        fetchAuthUser();
      } catch (error) {
        console.log(error.response.data.message);
        localStorage.removeItem("store_app_token");
        setIsLoading(false);
      }
    }
  }, [token, dispatch, navigate]);

  const handleActiveForm = () => {
    if (activeForm === "login") {
      dispatch(activate_register_form());
    } else {
      dispatch(activate_login_form());
    }
  };

  if (isLoading) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={() => setIsLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  } else {
    return (
      <>
        <Container sx={{ py: 2 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: { xs: "60vh", md: "80vh" } }}
          >
            <Grid item xs={11} sm={8} md={9}>
              <Box className="authForms">
                <Paper sx={{ width: "100%" }} elevation={5}>
                  {activeForm === "login" ? (
                    <Login changeActiveForm={handleActiveForm} />
                  ) : (
                    <Register changeActiveForm={handleActiveForm} />
                  )}
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
};

export default Auth;
