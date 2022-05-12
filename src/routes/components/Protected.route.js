import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";


const ProtectedRoute = (props) => {
  const location = useLocation()
  const [validToken, setValidToken] = useState('loading')

  useEffect(() => {
    console.log("it is here")
    let exp
    let iat
    let token = localStorage.getItem('token')
    if (token) {
      let decoded = jwt_decode(token);
      exp = new Date(decoded.exp)
      iat = new Date(decoded.iat)
    }
    if (exp - iat< 60*60*1000*3) {
      setValidToken(true)
    } else {
      setValidToken(false)
    }
  }, [])

  if (validToken === 'loading') return 'loading'
  if (validToken === true ) return <>{props.children}</>
  if (validToken === false ) return <Navigate to='/login' state={{from: location}} replace/>
}

export default ProtectedRoute;
