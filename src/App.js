import React, { useEffect } from 'react';
import Home from './pages/Home';
import ResponsiveAppBar from './components/AppBar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer';
import ProductView from './pages/ProductView';
import Subscribe from "./components/Subscribe";
import NotFound from "./components/NotFound";
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Auth from './pages/Auth';
import { Route, Routes } from 'react-router-dom';
import FilteredProducts from './pages/FilteredProducts';
import axios from "./api"
import { useDispatch } from 'react-redux';
import { getWishlist, setTrendingProducts } from './store/actions/products';
import ProtectedRoutes from './components/ProtectedRoutes';
import WishlistPage from './pages/WishlistPage';
import UserAccount from './components/user/UserAccount';
import UpdateProduct from './components/admin/UpdateProduct';
import NewProduct from './components/admin/NewProduct';
import Users from './components/admin/Users';
import UsersOrders from './components/admin/UsersOrders';
import UserOrders from './components/user/UserOrders';
import UpdateDetails from './components/user/UpdateDetails';
const App = () => {
  // const user_token = localStorage.getItem('store_app_token');
  const dispatch = useDispatch();
  useEffect(() => {
    const getTrendingProducts = async () => {
      try {
        const rs = await axios.get('/products/filtered?sort=trending');
        const rsData = await rs.data;
        dispatch(setTrendingProducts(rsData.products))
      } catch (error) {
        console.log(error)
      }
    }
    getTrendingProducts()

  }, [])

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        await dispatch(getWishlist())
      } catch (error) {
        console.log(error)
      }
    }
    fetchWishlist()

  }, [])

  return (
    <>
      {/* scroll to top ...................... */}
      <ScrollToTop />
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/filtered" element={<FilteredProducts />} />
        <Route path="/product_details/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route element={<Account />}>
            <Route path="/user_account/:email" element={<UserAccount />} />
            <Route path="/user_account/update_product/:productId" element={<UpdateProduct />} />
            <Route path="/user_account/new_product" element={<NewProduct />} />
            <Route path="/user_account/users" element={<Users />} />
            <Route path="/user_account/users_orders" element={<UsersOrders />} />
            <Route path="/user_account/user_orders" element={<UserOrders />} />
            <Route path="/user_account/update_details" element={<UpdateDetails />} />

          </Route>
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Subscribe />
      <Footer />
    </>
  );
}

export default App;