import { Box } from '@mui/material';
import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminProducts from '../admin/AdminProducts';
import WishlistSection from './WishlistSection';
const UserAccount = () => {

    const { authUser } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let initialActiveSection = "wishlist";
    if (authUser) {
      initialActiveSection = authUser.isAdmin ? "products" : "wishlist";
    }
    const [activeSection, setActiveSection] = useState(initialActiveSection);

    return (
      <>
        <Box>
          {activeSection === "products" ? (
            <AdminProducts />
          ) : (
            <WishlistSection />
          )}
        </Box>
      </>
    );
}
 
export default UserAccount;