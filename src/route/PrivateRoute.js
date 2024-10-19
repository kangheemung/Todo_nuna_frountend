import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
    //공용을 쓰일수 있어야 한다.
    return user ? children : <Navigate to="/login" />;
};
//user값이 있으면 투두
// 없으면 recirect to /login
export default PrivateRoute;
