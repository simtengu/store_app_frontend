import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import loginImg from "../../images/login.jpg";
import api from "../../api";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../store/actions/auth";
import MuiAlert from "@mui/material/Alert";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = ({ changeActiveForm }) => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
  let [errorMessage,setErrorMessage] = useState("");

  const navigate = useNavigate();

  //error handler function....................... 
    const handleError = (message) => {
      setError(true);
      setErrorMessage(message);
      setTimeout(() => {
        setError(false);
      }, 3000);
    };

  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
       handleError("Make sure you enter both email and password");
      return;
    }
    //logging in a user..............
    const userData = { email: username, password };
    try {
      setLoading(true);
      const response = await api.post("/login",
        userData
      );
      setLoading(false);
      if (response.status === 200) {
        console.log(response);
        const { token, user } = await response.data;
        localStorage.setItem("store_app_token", token);
        dispatch(setAuthUser(user));
        navigate(`/user_account/${user.email}`, { replace: true });
      }
    } catch (error) {
      setLoading(false);
       handleError("Wrong email or password");
    }
  };

  return (
    <Grid container>
      <Grid className="registerFormBgg" item xs={12} md={6}>
        <img style={{ width: "90%" }} src={loginImg} alt="loginImg" />
      </Grid>

      <Grid className="registerFormDiv" item xs={12} md={6} sx={{ p: 2 }}>
        <Box component="form" autoComplete="off" sx={{ py: 1 }}>
          <Typography variant="h5" sx={{ color: "#1976d2", mb: 1 }}>
            Login here
          </Typography>
          {error && (
            <Alert sx={{ my: 1 }} severity="error">
        {errorMessage}
            </Alert>
          )}

          <div>
            <TextField
              type="email"
              label="Email"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <TextField
              type="password"
              label="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {loading ? (
              <LoadingButton
                color="primary"
                loading={loading}
                loadingPosition="start"
                startIcon={<Logout />}
                variant="contained"
                size="large"
              >
                Login
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 1 }}
                onClick={handleFormSubmit}
              >
                Login
              </Button>
            )}

            <Button
              variant="text"
              sx={{ color: "#969696", marginRight: 2 }}
              onClick={() => changeActiveForm("register")}
            >
              I don't have an account
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
