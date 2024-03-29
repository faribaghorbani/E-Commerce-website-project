import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import _ from 'lodash';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getData } from '../services/http.service';
import { List, ListItem, ListItemButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import RTL from './RTL.component'
import LoadingComponent from './Loading.component';
import axios from 'axios';

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


const Searchbox = () => {
	const navigate = useNavigate()
	const [value, setValue] = useState("")
	const [data, setData] = useState([])
	const [showAutocomplete, setShowAutocomplete] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	

	const optimisedSearching = useCallback(_.debounce((e) => {
		axios.get(`/products?name_like=${e.target.value}&_start=0&_end=5`)
		.then(res => {
			setData(res.data)
			setLoading(false)
			setError(false)
		})
		.catch(err => {
			setLoading(false)
			setError(true)
		})
		// getData(`/products?name_like=${e.target.value}&_start=0&_end=5`,
		// // getData(`/products`,
		// (data) => {
		// 	setData(data)
		// 	setLoading(false)
		// 	setError(false)
		// },
		// () => {
		// 	setLoading(false)
		// 	setError(true)
		// })
	}, 1000), [navigate])

	const handleChange = (e) => {
		setValue(e.target.value)
		optimisedSearching(e)
		setShowAutocomplete(true)
		setLoading(true)
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
				// inputRef={inputReference}
				onChange={(e) => {
					handleChange(e)
				}}
				onBlur={(e) => {
					setShowAutocomplete(false)
				}}
				/>
			</Search>
			{showAutocomplete?
			<RTL>
				<Box sx={{position: 'absolute', top: "100%", right: {xs: 0}, width: {xs: '100%', sm: '500px'}}}>
					<Paper>
						{loading? 
						<LoadingComponent height={"150px"} />
						:error? (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px', textAlign: 'center' }}>
							<Typography color={"secondary"}>
							اتصال به سرور با خطا روبه رو شد
							</Typography>		
						</Box>)
						:<List dir='rtl'>
							{data.length === 0?
							<Typography color={"secondary"}>
								نتیجه ای یافت نشد
							</Typography>
							:
							<>
								{data.map((product) => {
									return (
										<ListItem>
											<ListItemButton>
												<Link 
												style={{textDecoration: 'none', color: 'inherit'}}
												to={`/products/${product?.category?.main}/${product?.category?.second}/${product?.id}`}>
												{product?.name}
												</Link>
											</ListItemButton>
										</ListItem>
									)
								})}
							</>
							}
						</List>
						}
					</Paper>
				</Box>
			</RTL>
			: null
			}
		</Box>
	)
}

export default Searchbox;
