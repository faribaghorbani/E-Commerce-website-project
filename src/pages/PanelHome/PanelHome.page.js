import React, { useEffect } from 'react'
import { Typography } from '@mui/material';
import RTL from '../../components/RTL.component'
import { setAdminPanelTitle } from '../../redux/slices/adminPanelTitleSlice';
import { useDispatch } from 'react-redux';

const PanelHomePage = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setAdminPanelTitle('پنل مدیریت فروشگاه'))
	}, [])
	
	return (
		<div style={{display: 'flex', justifyContent: 'center'}}>
		
		<Typography variant="h4" component="h2">
			از داشبورد پنل مورد نظر خود را انتخاب کنید
		</Typography>
		</div>
	)
}

export default PanelHomePage;
