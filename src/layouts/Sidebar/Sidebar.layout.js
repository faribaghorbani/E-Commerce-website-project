import { Grid } from '@mui/material';
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
		getDataUser('/category?_embed=subCategory', 
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
				<h1>salam</h1>
				<Grid container>
					<Grid item xs={9}>
						{props.children}
					</Grid>
					<Grid item xs={3}>
						<SidebarComponent />
					</Grid>
				</Grid>
			</>
		)
	}
}

export default SidebarLayout;
