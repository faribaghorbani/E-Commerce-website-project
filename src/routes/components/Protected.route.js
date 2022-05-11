import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const token = localStorage.getItem('token')
  const location = useLocation()
  console.log(token)

  return token? <>{props.children}</>:<Navigate to='/login' state={{from: location}} replace/>
}

export default ProtectedRoute;
