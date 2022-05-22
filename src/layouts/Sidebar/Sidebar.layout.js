import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import LoadingPage from '../../pages/Loading/Loading.page';
import { setCategoryData } from '../../redux/slices/categoryDataSlice';
import { getDataUser } from '../../services/http.service';
import Header from './Components/Header.component';
import SidebarComponent from './Components/Sidebar.component';


const SidebarLayout = (props) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
	const dispatch = useDispatch()


    useEffect(() => {
		getDataUser('/categories?_embed=subCategories', 
		(data) => {
			dispatch(setCategoryData(data))
			setLoading(false)
		},
		() => {
			setLoading(false)
			setError(true)
		})
    }, [])


	if (loading) {
		return (
			<>
				<Header />
				<LoadingPage/>
			</>
		)
	} else if (error) {
		return (
			<>
				<Header />
				<div>اتصال به سرور با خطا رو به رو شد</div>
			</>
		)
	} else {
		return (
			<>
				<Header />
				<Grid container spacing={2} sx={{ flexGrow: 1 }}>
					<Grid item container xs={9} sx={{ flexGrow: 1 }} spacing={2} 
					justifyContent="space-evenly"
  					alignItems="stretch">
						{props.children}
					</Grid>
					<Grid item xs={3}>
						<Paper elevation={3}>
							<SidebarComponent />
						</Paper>
					</Grid>
				</Grid>
			</>
		)
	}
}

export default SidebarLayout;
