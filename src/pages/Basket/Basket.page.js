import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LoadingPage from '../Loading/Loading.page';
import BasketTable from './Components/BasketTable.component';
import { useSelector, useDispatch } from 'react-redux';
import { changeNumberBasketProducts, changeStatusBasketProducts } from './../../redux/slices/basketProductsSlice'
import PaymentBill from './Components/PaymentBill.component';
import { Container } from '@mui/material';
import './Basket.scss'


const BasketPage = () => {
	const dispatch = useDispatch()
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const basketProducts = useSelector(state => state.basketProducts)

	useEffect(() => {
		axios.get('/products')
		.then(res => {
			setData(res.data)
			Object.entries(basketProducts).forEach(item => {
				const findSourceInData = res.data.find(product => product.id == item[0])
				if (findSourceInData == undefined) {
					dispatch(changeStatusBasketProducts({id : item[0], status: 'deleted'}))
				} else if (findSourceInData && findSourceInData.quantity == 0) {
					dispatch(changeStatusBasketProducts({id : item[0], status: 'not-existed'}))
				} else if (findSourceInData && findSourceInData.quantity < item[1].quantity) {
					dispatch(changeStatusBasketProducts({id : item[0], status: 'not-enough'}))
					dispatch(changeNumberBasketProducts({product: findSourceInData, quantity: findSourceInData.quantity, formerQuantity: item[1].product.quantity}))
				} else {
					dispatch(changeStatusBasketProducts({id : item[0], status: 'normal'}))
				}
			})
			setLoading(false)
		})
		.catch(err => {
			setLoading(false)
			setError(true)
		})
	}, [])


	if (loading) {
		return <LoadingPage />
	} else if (error) {
		return <div></div>
	} else {
		return (
			<Container maxWidth='xl' className='basket-page'>
				<Grid container spacing={2} justifyContent={"center"}>
					<Grid item xs={6} md={3}>
						<PaymentBill/>
					</Grid>
					<Grid item xs={12} md={9}>
						<BasketTable data={data}/>
					</Grid>
				</Grid>
			</Container>
		)
	}
}

export default BasketPage;
