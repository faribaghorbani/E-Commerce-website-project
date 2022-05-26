import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { getDataUser } from '../../services/http.service';
import LoadingPage from '../Loading/Loading.page';
import { Box, Grid, Pagination } from '@mui/material';
import { useNavigate, useParams, useSearchParams, } from 'react-router-dom';
import ProductCard from '../../components/ProductCard.component';
import axios from 'axios';


const ProductsPage = () => {
	const navigate = useNavigate();
	const params = useParams()
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
	const limit = useMemo(() => 6, []);
	let [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		let url
		if (!params.category && !params.subcategory) {
			url = `/products?_page=${searchParams.get('page')}&_limit=${limit}`
		} else if (params.category && !params.subcategory) {
			url = `/products?category.main=${params.category}&_page=${searchParams.get('page')}&_limit=${limit}`
		} else {
			url = `/products?category.main=${params.category}&category.second=${params.subcategory}&_page=${searchParams.get('page')}&_limit=${limit}`
		}

		axios.get(url)
		.then(res => {
			setData(res)
			setLoading(false)
		})
		.catch(err => {
			setError(true)
			setLoading(false)
		})
	}, [params, searchParams])


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
				{data.data.map((product) => {
					return (
						<Grid item xs={4} key={product.id}>
							<ProductCard product={product} height={'100%'} />
						</Grid>
					)
				})}
				<Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', my: 3}}>
					<Pagination
						dir='rtl'
						variant="outlined"
						defaultPage={1}
						page={+searchParams.get('page')}
						count={Math.ceil(data?.headers["x-total-count"] / limit)}
						onChange={(_, page) => {
							console.log(typeof page)
							setSearchParams({ page: +page })
						}}
					/>
				</Grid>
			</>
		)
	}
}

export default ProductsPage;
