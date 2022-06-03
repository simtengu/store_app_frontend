import React, { useReducer } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Save } from "@mui/icons-material";

import {
  activateError,
  activateLoading,
  deactivateError,
  deactivateLoading,
} from "../../store/actions/errorAndLoading";
import { updateUser } from "../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
const UpdateDetails = () => {
  const { authUser } = useSelector((state) => state.auth);
  let user = authUser || {};
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

      default:
        return state;
    }
  };
  let initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  };

  const [userInfo, dispatch] = useReducer(reducer, initialState);

  const { isErrorActive, errorMessage, isLoading } = useSelector(
    (state) => state.errorAndLoading
  );
  const redux_dispatch = useDispatch();

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
      !userInfo.phone
    ) {
      handleError("Please fill in all fields");
      return;
    }

    //checking if phone number characters are valid(10) ...........................
    if (!(userInfo.phone.split("").length === 10)) {
      handleError("Phone field must have exactly 10 characters");
      return;
    }

    //registering a user..............

    const userData = user.isAdmin
      ? {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          phone: userInfo.phone,
        }
      : {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          phone: userInfo.phone,
        };

    //dispatching action for registration of a user.............
    redux_dispatch(activateLoading());
    redux_dispatch(updateUser(userData))
      .then(() => {
        redux_dispatch(deactivateLoading());
      })
      .catch((error) => {
        redux_dispatch(deactivateLoading());
        handleError(error.response.data.message);
      });
  };
  return (
    <>
      <Box
        component="form"
        className="billingForm"
        sx={{
          border: "1px solid #c4c4c4",
          p: 2,

          borderRadius: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          color="primary"
          sx={{ fontWeight: 500 }}
          variant="h5"
          mb={2}
          gutterBottom
        >
          Update Your Details
        </Typography>
        {isErrorActive && (
          <Alert sx={{ my: 1 }} severity="error">
            {errorMessage}
          </Alert>
        )}
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <div>
              <TextField
                label="first name"
                id="outlined-size-small"
                size="small"
                value={userInfo.firstName}
                onChange={(e) =>
                  dispatch({ type: "setFirstName", payload: e.target.value })
                }
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div>
              <TextField
                label="last name"
                id="outlined-size-small"
                size="small"
                value={userInfo.lastName}
                onChange={(e) =>
                  dispatch({ type: "setLastName", payload: e.target.value })
                }
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div>
              <TextField
                label="email"
                type="email"
                id="outlined-size-small"
                size="small"
                value={userInfo.email}
                onChange={(e) =>
                  dispatch({ type: "setEmail", payload: e.target.value })
                }
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div>
              <TextField
                type="number"
                label="Phone"
                id="outlined-size-small"
                size="small"
                value={userInfo.phone}
                onChange={(e) =>
                  dispatch({ type: "setPhone", payload: e.target.value })
                }
              />
            </div>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          size="medium"
          startIcon={<Save />}
          sx={{ mt: 2 }}
          onClick={handleFormSubmit}
        >
          Update
        </Button>
      </Box>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={() => redux_dispatch(deactivateLoading())}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default UpdateDetails;
