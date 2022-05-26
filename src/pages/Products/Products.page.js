import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { getDataUser } from '../../services/http.service';
import LoadingPage from '../Loading/Loading.page';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard.component';


const ProductsPage = () => {
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
							<ProductCard product={product} height={'100%'} />
						</Grid>
					)
				})}
			</>
		)
	}
}

export default ProductsPage;
