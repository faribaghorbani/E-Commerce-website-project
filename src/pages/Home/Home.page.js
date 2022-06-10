import React, { Suspense, useEffect, useState } from 'react'
import './Home.scss'
import SliderComponent from './Components/Slider.component.js'
import anime from 'animejs'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GallerySlider from './Components/GallerySlider.component';
import { Grid, Box, Typography} from '@mui/material';
import { useSelector } from 'react-redux';
const Spline = React.lazy(() => import('@splinetool/react-spline'));


const HomePage = () => {
	const navigate = useNavigate()
	const themeMode = useSelector(state => state.themeMode)
	const [laptops, setLaptops] = useState([])
	const [phones, setPhones] = useState([])

	const animationLandingSVGDivider = () => {
		anime({
			targets: '#svg1 path',
			d: [
			  { value: 'M0,96L60,122.7C120,149,240,203,360,197.3C480,192,600,128,720,128C840,128,960,192,1080,192C1200,192,1320,128,1380,96L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z' },
			  { value: 'M0,64L60,101.3C120,139,240,213,360,245.3C480,277,600,267,720,229.3C840,192,960,128,1080,112C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z' },
			  { value: 'M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,186.7C840,213,960,203,1080,208C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z' }
			],
			easing: 'linear',
			duration: 5000,
			direction: 'alternate',
			delay: 0,
			loop: true
		  });
	}

	useEffect(() => {
		const requests = [
			axios.get('/products?category.main=laptop&_page=1&_limit=6'),
			axios.get('/products?category.main=phone')
		]
		animationLandingSVGDivider()

		Promise.all(requests)
		.then(([laptops, phones]) => {
			setLaptops(laptops.data)
			setPhones(phones.data)
		})
	}, [])


    return (
        <div className='home-page'>
			<div className='landing-view' style={{paddingTop: '100px'}}>
				<svg id='svg1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300">
					<path fill={themeMode=='light'?"#FFFFFF": "#121212"} fillOpacity="1" d="M0,32L60,69.3C120,107,240,181,360,192C480,203,600,149,720,106.7C840,64,960,32,1080,53.3C1200,75,1320,149,1380,186.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
				</svg>

				<Grid container alignItems={"center"} spacing={2}>
					<Grid item sm={12}  md={12} lg={7} order={{xs: 2, sm: 2, md: 2, lg: 1}} display={{sm: 'block', xs: 'none'}}>
						<Box className='spline-container' >
							<Suspense fallback={<div style={{minWidth: '300px'}}></div>}>
								<Spline
								className='spline-macbook' 
								canvasStyle={{width: "100%"}} 
								style={{width: "100%", height: '100%', overflow: 'hidden'}}
								scene="https://prod.spline.design/3MhcQsqMIcXvjSVt/scene.splinecode" />
							</Suspense>
						</Box>
					</Grid>
					<Grid item sm={12} md={12} lg={5} order={{xs: 1, sm: 1, md: 1, lg: 2}}>
						<Box dir='rtl' sx={{height: '200px' ,color: "white", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<Typography align='center' variant="h3" component="h1">
							به فروشگاه سیلیکان مال خوش آمدید
						</Typography>
						</Box>
					</Grid>
				</Grid>
			</div>

			<GallerySlider />


			<div className='main-category laptop'>
				<h2 className='title' onClick={() => navigate('/products/laptop?page=1')}>لپ تاپ</h2>
            	<SliderComponent cards={laptops} dir={'right'}/>
			</div>
			<div className='main-category phone'>
				<h2 className='title' onClick={() => navigate('/products/phone?page=1')}>موبایل</h2>
            	<SliderComponent cards={phones} dir={'left'}/> 
			</div>

        </div>
    )
}

export default HomePage;
