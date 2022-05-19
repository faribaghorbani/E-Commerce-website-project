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
        <Button variant="contained" onClick={() => {navigate('/panel')}}>ورود ادمین</Button>
        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
        <ul dir="rtl" style={{display: 'flex', justifyContent: 'center', gap: '10px', listStyleType: 'none'}}>
          <li style={{cursor: 'pointer'}}>صفحه محصولات</li>
          <li style={{cursor: 'pointer'}}>درباره ما</li>
        </ul>
        <img onClick={() => navigate('/')} style={{cursor: 'pointer', width: '200px'}} src={logo} />
        </div>
    </div>
  )
}

export default Header;
