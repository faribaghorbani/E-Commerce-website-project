import { Box, Paper, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getDataUser } from '../../services/http.service';
import LoadingPage from '../Loading/Loading.page';
import RTL from '../../components/RTL.component';
import GallerySlider from './Components/GallerySlider.component';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import { Markup } from 'interweave';
import ColorsCheckGroup from './Components/ColorsCheckGroup.component';
import { addBasketProducts, changeBasketProducts } from '../../redux/slices/basketProductsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


const ProductPage = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const basketProducts = useSelector(state => state.basketProducts)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
	const [images, setImages] = useState([])
	const [checkColor, setCheckColor] = useState(0)
	const [basketNumber, setBasketBumber] = useState(0)

	const addToBasket = (product) => {
		setBasketBumber(1)
		dispatch(addBasketProducts(product))
	}

	const handleChangeBasketNumber = (e, product) => {
		if (e.target.value <= product.quantity) {
			setBasketBumber(e.target.value)
			dispatch(changeBasketProducts({product: product, quantity: +e.target.value}))
		}
	}

	useEffect(() => {
		// console.log(basketProducts)
	}, [basketProducts])

	useEffect(() => {
		getDataUser(`/products?id=${params.id}`,
			(data) => {
				setData(data)
				setLoading(false)
			},
			() => {
				setLoading(false)
				setError(true)
			}
		)
	}, [])


	useEffect(() => {
		let tempArrofImages = []
		tempArrofImages = [...tempArrofImages, data[0]?.thumbnail]
		data[0]?.gallery?.map((img) => {
			tempArrofImages = [...tempArrofImages, img]
		})
		setImages(tempArrofImages.map(item => {
			return ({
				original: `http://localhost:3002/files/${item}`,
				thumbnail: `http://localhost:3002/files/${item}`,
			})
		}))
		setBasketBumber(basketProducts[data[0]?.id]?.quantity || 0)
	}, [data])

	if (loading) {
		return (
			<>
				<LoadingPage/>
			</>
		)
	} else if (error) {
		return (
			<>
				<div dir='rtl'>اتصال به سرور با خطا رو به رو شد</div>
			</>
		)
	} else {
		return (
			<>
			<Paper elevation={2}>
				<Box sx={{display: 'flex',flexDirection: {md: 'row'} ,
				 justifyContent: 'space-between', p: 3
				 }}>
					<GallerySlider images={images} style={{width:'50%'}}/>
					<Box sx={{p:5}}>
						{data?.map(item => {
							return (
								<div key={uuidv4()} dir="rtl">
									<Typography variant="h5" component="h2">
										{item.name}
									</Typography>

									<Box sx={{mb: 2}}>
										<Fab sx={{ml: 2}} variant="extended" size="medium" color="primary" aria-label="add">
											{item.category.main}
										</Fab>
										<Fab variant="extended" size="medium" color="secondary" aria-label="add">
											{item.category.second}
										</Fab>
									</Box>

									<Box dir="rtl" sx={{display: 'flex'}}>
										<Typography variant="h6" component="h2">
											{"برند:  "}
										</Typography>
										<Typography variant="h6" component="h2" sx={{mx: 2}}>
											{item.brand}
										</Typography>
									</Box>

									<Box dir="rtl" sx={{display: 'flex'}}>
										<Typography variant="h6" component="h2">
											{"رنگ:  "}
										</Typography>
										<ColorsCheckGroup colors={item.color} selectColor={setCheckColor} selectedColor={checkColor} />
									</Box>

									<Box dir="rtl">
										<Typography variant="h6" component="h2">
											{"توضیحات:  "}
										</Typography>
										<div style={{display: 'flex', alignItems: 'center'}}>
											<Markup content={item.description} />
										</div>
									</Box>

									<Box>
										{basketNumber <= 0?
										(<Button variant="contained" color="success" onClick={() => addToBasket(item)} disabled={item.quantity === 0}>
											افزودن به سبد خرید
										</Button>):
										(<input value={basketNumber} type={'number'} onChange={(e) => handleChangeBasketNumber(e, item)} />)
										}
									</Box>
								</div>
							)
						})}
					</Box>
				</Box>
			</Paper>
			</>
		)
	}
}

export default ProductPage;
