import React from 'react'
import logo from '../../../assets/images/logo.png'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate()
  return (
    <div style={{
      paddingLeft: '40px',
      paddingRight: '40px',
      backgroundColor: 'black',
      color: 'white' , 
      minHeight: '100px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100}}
      >
        <Button variant="contained" onClick={() => navigate('/')}>برگشت به صفحه اصلی</Button>
        <Typography variant="h4" component="h1">
            پنل کاربری ادمین
        </Typography>
        <img src={logo} style={{width: '200px'}} onClick={() => navigate('/')} />
    </div>
  )
}

export default Header;
