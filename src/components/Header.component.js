import React from 'react'
import logo from './../assets/images/logo.png'
import './style/Header.scss'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  return (
		<div className='regular-layout-header'>
			<div className='actions'>
				<Button className='admin-entrance' variant="contained" onClick={() => {navigate('/panel')}}>ورود ادمین</Button>
				<Button className='basket-entrance' variant="contained" onClick={() => {navigate('/basket')}}>سبد خرید</Button>
			</div>

			<ul className='navbar-items'>
				<li onClick={() => navigate('/products?page=1')}>صفحه محصولات</li>
				<li>درباره ما</li>
			</ul>

			<img className='logo' src={logo} onClick={() => navigate('/')} />
		</div>
	)
}

export default Header;
