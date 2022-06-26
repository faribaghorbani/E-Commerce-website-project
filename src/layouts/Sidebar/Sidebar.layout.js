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
import Footer from '../../components/Footer.component';


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
				<Footer />
			</>
		)
	} else if (error) {
		return (
			<>
				<CssBaseline />
				<Header />
				<NotfoundPage title={"اتصال به سرور با خطا رو به رو شد"} />
				<Footer />
			</>
		)
	} else {
		return (
			<>
				<CssBaseline />
				<Header />
					{/* <Container maxWidth={'xl'} > */}
					<Box sx={{ py: '150px', mx: 6}}>
						<Grid container spacing={2} justifyContent={"space-between"} sx={{ flexGrow: 1, padding: 0}}>
							
							<Grid item container 
							xs={12} 
							md={9}
							sx={{ flexGrow: 1 }} 
							order={{xs: 2, md: 1}}
							spacing={2} 
							justifyContent="space-evenly"
							alignItems="stretch"
							component={CustomPaper}
							>
								{props.children}
							</Grid>
							<Grid item xs={12} md={3} order={{xs: 1, md: 2}}>
								<Paper elevation={3} sx={{mb: 4}}>
									<SidebarComponent />
								</Paper>
							</Grid>
						</Grid>
					</Box>
				{/* </Container> */}
				<Footer />
			</>
		)
	}
}

export default SidebarLayout;
