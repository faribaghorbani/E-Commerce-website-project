import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";


const PrivateRoute = (props) => {
    const location = useLocation()
    const [validToken, setValidToken] = useState('loading')

  useEffect(() => {
    let exp
    let iat
    let token = localStorage.getItem('token')
    if (token) {
        console.log(token)
      let decoded = jwt_decode(token);
      exp = new Date(decoded.exp)
      iat = new Date(decoded.iat)
    }
    if (exp - iat< 60*60*1000*3) {
      console.log("set true")
      setValidToken(true)
    } else {
      console.log("set false")
      setValidToken(false)
    }
  }, [])

    let from = location.state?.from?.pathname || '/'

    if (validToken === 'loading') return 'loading'
    if (validToken === false ) return <>{props.children}</>
    if (validToken === true ) return <Navigate to={from} replace/>
}

export default PrivateRoute;
