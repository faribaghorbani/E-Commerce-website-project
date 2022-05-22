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
import { useNavigate, useParams } from 'react-router-dom';


const ProductsPage = () => {
	const selectedCategory = useSelector(state => state.selectedCategory)
	const navigate = useNavigate();
	const params = useParams()
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
	const limit = useMemo(() => 25, []);
	const [page, setPage] = useState(1);

	useEffect(() => {
		console.log(params)
		let url
		if (!params.category && !params.subcategory) {
			url = `/products?_page=${page}&_limit=${limit}`
		} else if (params.category && !params.subcategory) {
			url = `/products?category.main=${params.category}&_page=${page}&_limit=${limit}`
		} else {
			url = `/products?category.main=${params.category}&category.second=${params.subcategory}&_page=${page}&_limit=${limit}`
		}

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
	}, [params])


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
							<Card onClick={() => {navigate(`/products/${product.category.main}/${product.category.second}/${product.id}`)}}>
								<CardMedia
									component="img"
									// height="300"
									image={`http://localhost:3002/files/${product.thumbnail}`}
									alt="green iguana"
								/>
								<CardContent>
									<Typography dir="rtl" gutterBottom variant="h6" component="div">
										{product.name}
									</Typography>
									<Typography dir="rtl" variant="body2" color="text.secondary">
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
