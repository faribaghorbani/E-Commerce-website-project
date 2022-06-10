import { Box } from '@mui/material';
import React from 'react'
import './LoginLayout.scss'

const LoginLayout = (props) => {
    return (
        <Box className='login-layout'>
            {props.children}
        </Box>
    )
}

export default LoginLayout;
