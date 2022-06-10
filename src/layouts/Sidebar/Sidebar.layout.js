import { Container, Grid, Paper, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import LoadingPage from '../../pages/Loading/Loading.page';
import NotfoundPage from '../../pages/Notfound/Notfound.page';
import { setCategoryData } from '../../redux/slices/categoryDataSlice';
import { getDataUser } from '../../services/http.service';
import Header from './Components/Header.component';
import SidebarComponent from './Components/Sidebar.component';
import { styled, useTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


const CustomPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	textAlign: 'center'
}));


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
			    <CssBaseline />
				<Header />
				<LoadingPage/>
			</>
		)
	} else if (error) {
		return (
			<>
				<CssBaseline />
				<Header />
				<NotfoundPage title={"اتصال به سرور با خطا رو به رو شدgi"} />
			</>
		)
	} else {
		return (
			<>
				<CssBaseline />
				<Header />
					<Container >
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={2} justifyContent={"space-between"} sx={{ flexGrow: 1, padding: 0}}>
							
							<Grid item container 
							xs={9} 
							sx={{ flexGrow: 1 }} 
							spacing={2} 
							justifyContent="space-evenly"
							alignItems="stretch"
							component={CustomPaper}
							>
								{props.children}
							</Grid>
							<Grid item xs={3}>
								<Paper elevation={3}>
									<SidebarComponent />
								</Paper>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</>
		)
	}
}

export default SidebarLayout;
