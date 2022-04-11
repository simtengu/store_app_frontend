import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const useAuth = ()=>{
    const { authUser } = useSelector((state) => state.auth);

    return authUser ? true : false;

}
const ProtectedRoutes = () => {
    let isUserLoggedIn = useAuth();
    return isUserLoggedIn ? <Outlet /> : <Navigate to="/auth" />
}
 
export default ProtectedRoutes;