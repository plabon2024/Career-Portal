import React, { Children, use } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useLocation } from 'react-router';

const PrivateRoute = ({Children}) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    
    if(loading){
        return <span className="loading loading-ring loading-xl"></span>
    }

    if(!user){
        return <Navigate to="/signIn" state={location.pathname}></Navigate>
    }

    return Children;
};

export default PrivateRoute;