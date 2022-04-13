import {
  AccountCircle,
  Add,
  Home,
  Inbox,
  Logout,
  People,
  ShoppingCart,
  StarBorder,
  TableBar,
  Update,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const AppDrawer = (props) => {
  let { onLogout, totalCartItems, onCloseDrawer, isDrawerOpen } = props;
  const { authUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  let location = useLocation();
  let path = location.pathname;
  let pathArray = path.split("/");
  let final_path = pathArray[1];

  return (
    <>
      <Drawer anchor="left" open={isDrawerOpen} onClose={onCloseDrawer}>
        <Box
          sx={{ width: { xs: "70vw", sm: "60vw", md: 275 } }}
          role="presentation"
          onClick={onCloseDrawer}
        >
          <List sx={{ my: 0, py: 0 }}>
            {final_path === "user_account" && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate(`/user_account/${authUser.email}`)}
                  >
                    <ListItemIcon>
                      {authUser && authUser.isAdmin ? (
                        <Inbox />
                      ) : (
                        <StarBorder />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        authUser && authUser.isAdmin
                          ? "Products"
                          : "My Wishlist"
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )}

            {final_path === "user_account" && authUser && authUser.isAdmin ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/user_account/new_product")}
                  >
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText primary="New Product" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/user_account/users")}
                  >
                    <ListItemIcon>
                      <People />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/user_account/users_orders")}
                  >
                    <ListItemIcon>
                      <TableBar />
                    </ListItemIcon>
                    <ListItemText primary="Received Orders" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ) : (
              ""
            )}

            {final_path === "user_account" && authUser && !authUser.isAdmin ? (
              <>
                {" "}
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/user_account/user_orders")}
                  >
                    <ListItemIcon>
                      <TableBar />
                    </ListItemIcon>
                    <ListItemText primary="My Orders" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ) : (
              ""
            )}

            {final_path === "user_account" && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate(`/user_account/update_details`)}
                  >
                    <ListItemIcon>
                      <Update />
                    </ListItemIcon>
                    <ListItemText primary="Update Details" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )}

            {authUser && final_path !== "user_account" ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate(`/user_account/${authUser.email}`)}
                  >
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="My Account" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate("/wishlist")}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Wishlist" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ) : (
              ""
            )}

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/cart")}>
                <ListItemIcon>
                  <ShoppingCart />
                </ListItemIcon>
                <ListItemText primary={`Cart (${totalCartItems})`} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <Divider />

            {!authUser && (
              <>
                
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate("/auth");
                    }}
                  >
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText primary="Login/Register" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )}

            {authUser && (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={onLogout}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default AppDrawer;
