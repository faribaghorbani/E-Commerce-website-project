import React, { useEffect, useState } from 'react'
import logo from './../../../assets/images/logo.png'
import './style/Header.scss'
import { useNavigate, Link } from 'react-router-dom';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeSwitchComponent from './../../../components/ThemeSwitch.component';
import { useTheme } from '@mui/system';
import GotoBasket from '../../../components/GotoBasket.component';
import GotoPanel from '../../../components/GotoPanel.component';
import Searchbox from '../../../components/Searchbox.component';
import HeaderDrawer from '../../../components/Sidebar.component';


const Header = () => {
	const navigate = useNavigate()
	const theme = useTheme()
	const [state, setState] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
        ) {
        return;
        }

        setState(open);
    };


	return (
		<>
		<div className='sidebar-layout-header'>
			<Box className='actions' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px'}}>
				<IconButton
				size="large"
				edge="start"
				color="inherit"
				aria-label="open drawer"
				sx={{display: { xs: 'block', lg: 'none' } }}
				onClick={toggleDrawer(true)}
				>
					<MenuIcon />
				</IconButton>
				<Box sx={{display: {xs: 'none', lg: 'flex'}, justifyContent: 'space-between', alignItems: 'stretch', gap: '20px'}}>
					<GotoPanel />
					<GotoBasket />
				</Box>
				<Searchbox />
			</Box>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', gap: '20px'}}>
				<Box className='navbar-items' component={'ul'} sx={{display: {xs: 'none', md: 'flex'}, justifyContent: 'space-between', alignItems: 'center', gap: '20px'}}>
					<Link to='/' style={{textDecoration: 'none', color: 'inherit'}}><li>خانه</li></Link>
					<Link to='/products?page=1' style={{textDecoration: 'none', color: 'inherit'}}><li>محصولات</li></Link>
					<li><ThemeSwitchComponent /></li>
				</Box>
				<Box sx={{display: {xs: 'none', sm: 'block'}}}>
					<Link to='/' style={{textDecoration: 'none', color: 'inherit'}}><img className='logo' src={logo}/></Link>
				</Box>
			</Box>
		</div>
		<HeaderDrawer state={state} toggleDrawer={toggleDrawer} />
		</>
	)
}

export default Header;
