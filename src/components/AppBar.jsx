import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";

//scroll to top imports....................
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Mail,
  Phone,
  Search,
  ShoppingCart,
  StarBorder,
} from "@mui/icons-material";
import {
  Badge,
  Grid,
  InputBase,
  Stack,
  MenuItem,
  Button,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  activate_login_form,
  activate_register_form,
} from "../store/actions/authForms";
import { setAuthUser, unSetAuthUser } from "../store/actions/auth";
import axios from "../api/secureApi";
import { openSearchDiv } from "../store/actions/errorAndLoading";
import ProductsSearch from "./ProductsSearch";
import AppDrawer from "./AppDrawer";

//end of scroll to top
//scroll to top component.......................................
function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

//end of scroll to top function.........................

//The main app bar component .........................

const ResponsiveAppBar = (props) => {
  const dispatch = useDispatch();
  const {
    cart: { totalQuantity },
  } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);

  //menu section ...........................
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { isSearchDivActive } = useSelector((state) => state.errorAndLoading);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //logout...........
  const handleLogOut = () => {
    dispatch(unSetAuthUser());
    localStorage.removeItem("store_app_token");
    handleClose();
    navigate("/", { replace: true });
  };

  let user_id = authUser ? authUser._id : "kdfkdfdf";
  //logging in the user ............
  React.useEffect(() => {
    if (!authUser) {
      const token = localStorage.getItem("store_app_token");
      if (token) {
        const fetchAuthUser = async () => {
          const response = await axios.get("/user");
          const { user } = response.data;
          if (user) {
            dispatch(setAuthUser(user));
          }
        };
        try {
          fetchAuthUser();
        } catch (error) {
          console.log(error.response.message);
          localStorage.removeItem("store_app_token");
        }
      }
    }
  }, []);

  return (
    <>
      <AppDrawer
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={() => setIsDrawerOpen(false)}
        totalCartItems={totalQuantity}
        onLogout={handleLogOut}
      />

      {isSearchDivActive && <ProductsSearch />}

      <Box sx={{ p: 1, bgcolor: "#343a40" }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Mail sx={{ color: "#dd9b00", fontSize: 16, mr: 0.5 }} />{" "}
                  <Typography variant="caption" sx={{ color: "#cdcdcd" }}>
                    albertsimtengu@gmail.com
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Phone
                    sx={{
                      color: "#dd9b00",
                      fontSize: 16,
                      mr: 0.5,
                      display: { xs: "none", sm: "inline" },
                    }}
                  />{" "}
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#cdcdcd",
                      display: { xs: "none", sm: "inline" },
                    }}
                  >
                    +255 710162838
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            {authUser && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Stack direction="row" alignItems="center">
                    <p
                      style={{
                        color: "#bcbcbc",
                        marginBottom: 0,
                        marginRight: 4,
                        marginTop: 0,
                      }}
                    >
                      <span style={{ color: "#dd9b00" }}>Hi</span>{" "}
                      {authUser.firstName}
                    </p>
                    <Link
                      className="normalLink"
                      style={{
                        color: "#bcbcbc",
                        fontSize: 14,
                        margin: "0px 7px 0px 14px",
                      }}
                      to={`/user_account/${authUser.email}`}
                    >
                      My Account
                    </Link>

                    <Link
                      className="normalLink"
                      to="/checkout"
                      style={{
                        color: "#bcbcbc",
                        fontSize: 14,
                        margin: "0px 7px",
                      }}
                    >
                      Checkout
                    </Link>
                  </Stack>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      <AppBar sx={{ backgroundColor: "#343a40" }} position="static">
        <Container>
          <Toolbar
            id="back-to-top-anchor"
            sx={{ display: "flex", flexFlow: 1 }}
          >
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link to="/" id="logo">
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "#2f87d1", fontWeight: "bolder" }}
                >
                  Shop<span style={{ color: "#dd9b00" }}>App</span>
                </Typography>
              </Link>
            </Box>

            <Box>
              <Box sx={{ display: { xs: "inline", sm: "none" }, mr: 1 }}>
                <IconButton
                  style={{ color: "white" }}
                  onClick={() => dispatch(openSearchDiv())}
                >
                  <Search />
                </IconButton>
              </Box>
              <Box
                sx={{
                  p: 1,
                  backgroundColor: "rgba(231,231,231,0.1)",
                  borderRadius: 2,
                  display: { xs: "none", sm: "inline" },
                  mr: 2,
                }}
              >
                <IconButton>
                  <Search sx={{ mx: 1, color: "#d4d4d4" }} />
                </IconButton>
                <InputBase
                  variant="standard"
                  placeholder="search..."
                  sx={{ color: "whitesmoke", width: { xs: 50, md: 250 } }}
                  onFocus={() => dispatch(openSearchDiv())}
                />
              </Box>
              <Box sx={{ display: { xs: "none", md: "inline" } }}>
                <Link to="/wishlist">
                  <IconButton>
                    <StarBorder sx={{ color: "#bcbcbc" }} />
                  </IconButton>
                </Link>
                <Link to="/cart">
                  <Badge
                    color="secondary"
                    badgeContent={totalQuantity > 0 ? totalQuantity : "0"}
                  >
                    <ShoppingCart sx={{ color: "#bcbcbc", mx: 1 }} />
                  </Badge>
                </Link>

                {authUser ? (
                  <div style={{ display: "inline" }}>
                    <IconButton
                      sx={{ mx: 1 }}
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          navigate(`/user_account/${authUser.email}`);
                          handleClose();
                        }}
                      >
                        My account
                      </MenuItem>
                      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <div style={{ display: "inline" }}>
                    <Button
                      sx={{
                        mx: 1,
                        color: "#dd9b00",
                        textTransform: "lowercase",
                        fontSize: 16,
                      }}
                      size="small"
                      variant="text"
                      onClick={() => {
                        dispatch(activate_register_form());
                        navigate("/auth");
                      }}
                    >
                      Register
                    </Button>
                    <Button
                      sx={{
                        mx: 1,
                        color: "#dd9b00",
                        textTransform: "lowercase",
                        fontSize: 16,
                      }}
                      size="small"
                      variant="text"
                      onClick={() => {
                        dispatch(activate_login_form());
                        navigate("/auth");
                      }}
                    >
                      Login
                    </Button>
                  </div>
                )}
              </Box>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ display: { md: "none" } }}
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};
export default ResponsiveAppBar;
