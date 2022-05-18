import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { getDataUser } from '../../services/http.service';
import LoadingPage from '../Loading/Loading.page';
import RTL from '../../components/RTL.component';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ProductsPage = () => {
	const selectedCategory = useSelector(state => state.selectedCategory)
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
	const limit = useMemo(() => 25, []);
	const [page, setPage] = useState(1);

	useEffect(() => {
		let url
		if (!selectedCategory.category && !selectedCategory.subCategory) {
			url = `/products?_page=${page}&_limit=${limit}`
		} else if (selectedCategory.category && !selectedCategory.subCategory) {
			url = `/products?category.main=${selectedCategory.category}&_page=${page}&_limit=${limit}`
		} else {
			url = `/products?category.main=${selectedCategory.category}&category.second=${selectedCategory.subCategory}&_page=${page}&_limit=${limit}`
		}
		// console.log(url);
		console.log(selectedCategory);

		getDataUser(url, 
			(data) => {
				setData(data)
				setLoading(false)
			},
			() => {
				setError(true)
				setLoading(false)
			}
		)
	}, [selectedCategory])

	useEffect(() => {
		console.log(data)
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
				<div>اتصال به سرور با خطا رو به رو شد</div>
			</>
		)
	} else {
		return (
			<>
				{data.map((product) => {
					return (
						<Grid item xs={4} key={product.id}>
						{/* <Card sx={{ maxWidth: 345 }}> */}
							<Card onClick={() => {navigate(`${product.category.main}/${product.category.second}/${product.id}`)}}>
								<CardMedia
									component="img"
									// height="300"
									image={`http://localhost:3002/files/${product.thumbnail}`}
									alt="green iguana"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{product.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{product.price} تومان
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					)
				})}
			</>
		)
	}
}

export default ProductsPage;
