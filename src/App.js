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
const App = () => {
 // const user_token = localStorage.getItem('store_app_token');


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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/user_account/:email" element={<Account />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Subscribe />
      <Footer />
    </>
  );
}

export default App;