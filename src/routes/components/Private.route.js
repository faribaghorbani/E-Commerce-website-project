import React from 'react'
import { useSelector } from 'react-redux'

const PrivateRoute = (props) => {
    const userToken = useSelector(state => state.user)

    return (
      <>
        {props.children}
      </>
    )
}

export default PrivateRoute;
