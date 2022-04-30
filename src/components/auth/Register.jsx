import React, { useReducer,useEffect } from "react";
import { Logout } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert as MuiAlert,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { registerUser } from "../../store/actions/auth";
import { activateError, activateLoading, deactivateError, deactivateLoading } from "../../store/actions/errorAndLoading";
import ScrollToTop from "../ScrollToTop";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Register = ({ changeActiveForm }) => {

const { isErrorActive,errorMessage,isLoading } = useSelector((state) => state.errorAndLoading);
const redux_dispatch = useDispatch();
const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case "setFirstName":
        return { ...state, firstName: action.payload };

      case "setLastName":
        return { ...state, lastName: action.payload };

      case "setEmail":
        return { ...state, email: action.payload };

      case "setPhone":
        return { ...state, phone: action.payload };
      case "setPassword":
        return { ...state, password: action.payload };
      case "setConfirmPassword":
        return { ...state, confirm_password: action.payload };
      default:
        return state;
    }
  };
  let initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  };

  const [userInfo, dispatch] = useReducer(reducer, initialState);
  // let [error, setError] = useState(false);
  // let [loading, setLoading] = useState(false);
  // let [errorMessage, setErrorMessage] = useState("");

  const handleError = (message) => {
    redux_dispatch(activateError(message));
    setTimeout(() => {
      redux_dispatch(deactivateError());
    }, 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
     
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.phone ||
      !userInfo.password ||
      !userInfo.confirm_password
    ) {
       handleError("Please fill in all fields");
      return;
    }

    //checking if phone number characters are valid(10) ...........................
    if (!(userInfo.phone.split("").length === 10)) {
      handleError("Phone field must have exactly 10 characters");
      return;
    }
    //checking if password was confirmed ...........................
    if (!(userInfo.password === userInfo.confirm_password)) {
      handleError("password entered doesn't match");
      return;
    }

    //checking if confirmed password is greater than  or equal to 4 ...........................
    if ((userInfo.password.length < 4)) {
      handleError("Password must have atleast 4 characters");
      return;
    }

    //registering a user..............
    const userData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phone: userInfo.phone,
      password: userInfo.password,
    };

  
      //dispatching action for registration of a user............. 
      redux_dispatch(activateLoading());
       redux_dispatch(registerUser(userData))
         .then(() => {
           redux_dispatch(deactivateLoading());
           navigate(`/user_account/${userInfo.email}`, { replace: true });
         })
         .catch((error) => {
           redux_dispatch(deactivateLoading());
                 let error_message = error.response
        ? error.response.data.message
        : error.message;
  
       handleError(error_message);
           
         });
 
  };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);


  return (
    <>
    
    <Grid container>
      <Grid className="registerFormBg" item xs={12} md={6}></Grid>
      {/* bgcolor: "#e2e2e2" */}
      <Grid className="registerFormDiv" item xs={12} md={6} sx={{ p: 2 }}>
        <Box component="form" autoComplete="off" sx={{ py: 1 }}>
          <Typography variant="h5" sx={{ color: "#1976d2", mb: 1 }}>
            Register here
          </Typography>
          {isErrorActive && (
            <Alert sx={{ my: 1 }} severity="error">
              {errorMessage}
            </Alert>
          )}
          <div>
            <TextField
              label="First Name"
              fullWidth
              size="small"
              margin="normal"
              required
              value={userInfo.firstName}
              onChange={(e) =>
                dispatch({ type: "setFirstName", payload: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              label="Last Name"
              fullWidth
              size="small"
              margin="normal"
              required
              value={userInfo.lastName}
              onChange={(e) =>
                dispatch({ type: "setLastName", payload: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              type="email"
              label="Email"
              fullWidth
              size="small"
              margin="normal"
              required
              value={userInfo.email}
              onChange={(e) =>
                dispatch({ type: "setEmail", payload: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              type="number"
              label="Phone"
              fullWidth
              size="small"
              margin="normal"
              required
              value={userInfo.phone}
              onChange={(e) =>
                dispatch({ type: "setPhone", payload: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              type="password"
              label="password"
              fullWidth
              size="small"
              margin="normal"
              required
              value={userInfo.password}
              onChange={(e) =>
                dispatch({ type: "setPassword", payload: e.target.value })
              }
            />
          </div>

          <div>
            <TextField
              type="password"
              label="confirm password"
              fullWidth
              size="small"
              margin="normal"
              required
              value={userInfo.confirm_password}
              onChange={(e) =>
                dispatch({
                  type: "setConfirmPassword",
                  payload: e.target.value,
                })
              }
            />
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {isLoading ? (
              <LoadingButton
                color="primary"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<Logout />}
                variant="contained"
              >
                Register
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1 }}
                onClick={handleFormSubmit}
              >
                Register
              </Button>
            )}

            <Button
              variant="text"
              sx={{ color: "#969696", marginRight: 2 }}
              onClick={() => changeActiveForm("login")}
            >
              go to login
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
    </>
  );
};

export default Register;
