import React, { useEffect, useState } from "react";
import {
  Add,
  Inbox,
  Logout,
  People,
  Star,
  TableBar,
  Update,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AdminProducts from "../components/admin/AdminProducts";
import NewProduct from "../components/admin/NewProduct";
import Users from "../components/admin/Users";
import UsersOrders from "../components/admin/UsersOrders";
import UserOrders from "../components/user/UserOrders";
import UpdateDetails from "../components/user/UpdateDetails";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { unSetAuthUser } from "../store/actions/auth";
import UpdateProduct from "../components/admin/UpdateProduct";
import WishlistSection from "../components/user/WishlistSection";
const Account = () => {

  const { authUser } = useSelector((state) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let initialActiveSection = "wishlist";
  if(authUser){
    
    initialActiveSection = authUser.isAdmin ? "products" : "wishlist";
  }
  const [activeSection, setActiveSection] = useState(initialActiveSection);


  //logout...........
  const handleLogOut = () => {
    dispatch(unSetAuthUser());
    localStorage.removeItem("store_app_token");
    navigate("/", { replace: true });
  };

  //update product.............. 
  const handleUpdateProduct = (value)=>{
    setSelectedProduct(value)
    setActiveSection("update_product");
  }

  if (!authUser) {
    return <div style={{width:'100vw',height:'100vh',backgroundColor:'orange'}}>
    </div>
  }

  return (
    <>
      <Grid container>
        <Grid item px={0} md={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 360,
              minHeight: "90vh",
              bgcolor: "#f1f3f4",
              boxShadow: "1px 1px 3px grey",
            }}
          >
            <nav>
              {authUser && authUser.isAdmin ? (
                <List sx={{ my: 0, py: 0 }}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        navigate(`/user_account/${authUser.email}`)
                      }
                    >
                      <ListItemIcon>
                        <Inbox />
                      </ListItemIcon>
                      <ListItemText primary="Products" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
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
                </List>
              ) : (
                <List sx={{ my: 0, py: 0 }}>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        navigate(`/user_account/${authUser.email}`)
                      }
                    >
                      <ListItemIcon>
                        <Star />
                      </ListItemIcon>
                      <ListItemText primary="My Wishlist" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <Divider />
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
                </List>
              )}

              <List sx={{ my: 0, py: 0 }}>
                <Divider />

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
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogOut}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </List>
            </nav>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box p={2}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Account;
