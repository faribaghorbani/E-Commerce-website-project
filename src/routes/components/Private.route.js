import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = (props) => {
    const token = localStorage.getItem('token')
    const location = useLocation()

    let from = location.state?.from?.pathname || '/'

    return token? <Navigate to={from} replace/>:<>{props.children}</>
}

export default PrivateRoute;
