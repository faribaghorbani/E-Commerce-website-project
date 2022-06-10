import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import _ from 'lodash';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getData } from '../services/http.service';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Box } from '@mui/system';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
	  backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	display: 'flex', 
	justifyContent: 'center',
	alignItems: 'center',
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
	  marginLeft: theme.spacing(1),
	  width: 'auto',
	},
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	right: 0,
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingRight: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '12ch',
			'&:focus': {
			width: '20ch',
			},
		},
	},
}));

const mobileMenuId = 'primary-search-account-menu-mobile';

const Searchbox = () => {
	const navigate = useNavigate()
	const [value, setValue] = useState("")
	const [data, setData] = useState([])
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	  };

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	  };
	
	  const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	  };
	
	  const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	  };
	

	const optimisedSearching = useCallback(_.throttle((e) => {
		getData(`/products?name_like=${e.target.value}`,
		// getData(`/products`,
		(data) => {
			setData(data)
			console.log(data)
		},
		() => navigate("/login", {replace: true})
	)
	}, 1000), [navigate])

	const handleChange = (e) => {
		setValue(e.target.value)
		optimisedSearching(e)
	}

	return (
		<Box sx={{position: 'relative'}}>
			<Search dir='rtl'>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
				<StyledInputBase
				placeholder="جست و جو ..."
				inputProps={{ 'aria-label': 'search' }}
				value={value}
				onChange={(e) => {
					handleChange(e)
					handleMobileMenuOpen(e)

				}}
				/>
			</Search>
			<Menu
			sx={{position: 'absolute', top: '50px', height: "400px", overflowY: "scroll"}}
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
			>
				{data.map((item) => {
					return (
					<MenuItem dir='rtl'>
						<Link to={`/products/${item.category.main}/${item.category.second}/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
							{item.name}
						</Link>
					</MenuItem>
					)
				})}
			</Menu>
		</Box>
	)
}

export default Searchbox;
