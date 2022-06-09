import React, { useEffect, useState } from 'react'
import logo from './../assets/images/logo.png'
import './style/Header.scss'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import ThemeSwitchComponent from './ThemeSwitch.component';
import { useTheme } from '@mui/system';


const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
	  right: -3,
	  top: 13,
	  border: `2px solid ${theme.palette.background.paper}`,
	  padding: '0 4px',
	},
}));


const Header = () => {
	const basketProducts = useSelector(state => state.basketProducts)
	const navigate = useNavigate()
	const theme = useTheme()
	const [basketBadge, setBasketBadge] = useState(0)

	useEffect(() => {
		let sum = 0
        Object.entries(basketProducts).forEach(item => {
            if (item[1].status == 'normal' ||  item[1].status == 'not-enough') {
                sum += (item[1].quantity)
            }
        })
        setBasketBadge(sum)
	}, [basketProducts])

	return (
		<div className='regular-layout-header'>
			<div className='actions' style={{display: 'flex', justifyContent: 'center', alignItems: 'stretch'}}>
				<Button className='admin-entrance' variant="contained" onClick={() => {navigate('/panel')}}>ورود ادمین</Button>
				
				{basketBadge?
				(<IconButton aria-label="cart" style={{color: 'white'}} onClick={() => {navigate('/basket')}}>
					<StyledBadge badgeContent={basketBadge}>
						<ShoppingCartIcon />
					</StyledBadge>
				</IconButton>) : 
				(<IconButton aria-label="cart" style={{color: 'white'}} onClick={() => {navigate('/basket')}}>
					<ShoppingCartIcon />
				</IconButton>) 
				}
			</div>

			<ul className='navbar-items'>
				<li onClick={() => navigate('/products?page=1')}>صفحه محصولات</li>
				<li style={{color: theme.palette.primary.contrastText}}>درباره ما</li>
				<li><ThemeSwitchComponent /></li>
			</ul>

			<img className='logo' src={logo} onClick={() => navigate('/')} />
		</div>
	)
}

export default Header;
