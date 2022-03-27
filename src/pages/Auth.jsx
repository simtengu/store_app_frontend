
import { Box, Container, Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { unSetAuthUser } from "../store/actions/auth";
import { activate_login_form, activate_register_form } from "../store/actions/authForms";
import {useNavigate} from "react-router-dom";

const Auth = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeForm } = useSelector((state) => state.authForm);
  const { authUser } = useSelector((state) => state.auth);
 useEffect(() => {
   const token = localStorage.getItem('store_app_token')
   if(token){
     navigate('/',{replace:true})
   }
 }, [])
  const handleActiveForm = () => {
    if (activeForm === "login") {
      dispatch(activate_register_form());
    } else {
      dispatch(activate_login_form());
    }
  };

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
};

export default Auth;
