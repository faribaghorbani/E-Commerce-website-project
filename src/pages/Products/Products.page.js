import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { getDataUser } from '../../services/http.service';
import LoadingPage from '../Loading/Loading.page';
import { Box, Grid, Pagination } from '@mui/material';
import { useNavigate, useParams, useSearchParams, } from 'react-router-dom';
import ProductCard from '../../components/ProductCard.component';
import axios from 'axios';
import { useSelector } from 'react-redux';
import NotfoundPage from '../Notfound/Notfound.page';


const ProductsPage = () => {
	const navigate = useNavigate();
	const params = useParams()
	const categoryData = useSelector(state => state.categoryData)
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [data, setData] = useState([])
	const limit = useMemo(() => 6, []);
	let [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setLoading(true)
		setError(false)
		setNotFound(false)
		console.log(categoryData)
		let url
		let isItValidGroup = false
		if (!params.category && !params.subcategory) {
			url = `/products?_page=${searchParams.get('page')}&_limit=${limit}`
			isItValidGroup = true
			console.log('not selected')
		} else if (params.category && !params.subcategory) {
			url = `/products?category.main=${params.category}&_page=${searchParams.get('page')}&_limit=${limit}`
			categoryData.forEach((category) => {
				if (category.name == params.category) {
					console.log('category exist')
					isItValidGroup = true
				}
			})
		} else {
			url = `/products?category.main=${params.category}&category.second=${params.subcategory}&_page=${searchParams.get('page')}&_limit=${limit}`
			categoryData.forEach((category) => {
				if (category.name == params.category && category.subCategories.some((sub) => sub.name == params.subcategory)) {
					console.log('both exist')
					isItValidGroup = true
				}
			})
		}

		if (isItValidGroup == true) {
			setNotFound(false)
			axios.get(url)
			.then(res => {
				setData(res)
				setLoading(false)
			})
			.catch(err => {
				setError(true)
				setLoading(false)
			})
		} else {
			setLoading(false)
			setError(false)
			setNotFound(true)
		}
	}, [params, searchParams])


	if (loading) {
		return (
			<LoadingPage/>
		)
	} else if (error) {
		return (
			<NotfoundPage title={"اتصال به سرور با خطا رو به رو شد"} />
		)
	} else if (notFound) {
		return (
			<NotfoundPage title={"صفحه مورد نظر یافت نشد"} />
		)
	} else {
		return (
			<>
				{data.data?.map((product) => {
					return (
						<Grid item xs={4} key={product.id}>
							<ProductCard product={product} height={'100%'} />
						</Grid>
					)
				})}
				<Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', my: 3}}>
					<Pagination
					sx={{backgroundColor: 'black'}}
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
