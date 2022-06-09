import React, { useEffect, useState } from 'react'
import logo from './../../../assets/images/logo.png'
import './style/Header.scss'
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import ThemeSwitchComponent from './../../../components/ThemeSwitch.component';
import { useTheme } from '@mui/system';
import GotoBasket from '../../../components/GotoBasket.component';
import GotoPanel from '../../../components/GotoPanel.component';
import Searchbox from '../../../components/Searchbox.component';


const Header = () => {
	const navigate = useNavigate()
	const theme = useTheme()


	return (
		<div className='home-layout-header'>
			<div className='actions' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', gap: '20px'}}>
				<GotoPanel />
				<GotoBasket />
				<Searchbox />
			</div>

			<ul className='navbar-items'>
				<Link to='/' style={{textDecoration: 'none', color: 'inherit'}}><img className='logo' src={logo}/></Link>
				<Link to='/' style={{textDecoration: 'none', color: 'inherit'}}><li>خانه</li></Link>
				<Link to='/products?page=1' style={{textDecoration: 'none', color: 'inherit'}}><li>صفحه محصولات</li></Link>
				<li><ThemeSwitchComponent /></li>
			</ul>

		</div>
	)
}

export default Header;
