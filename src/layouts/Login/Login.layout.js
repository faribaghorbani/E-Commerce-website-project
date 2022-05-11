import React from 'react'
import './LoginLayout.scss'

const LoginLayout = (props) => {
    return (
        <div className='login-layout'>
            {props.children}
        </div>
    )
}

export default LoginLayout;
