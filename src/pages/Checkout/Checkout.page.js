import React from 'react'
import Container from '@mui/material/Container';
import CheckoutForm from './Components/CheckoutForm.component';
import { Grid } from '@mui/material';
import './Checkout.scss'
import { useSelector } from 'react-redux';
import EmptyBasketComponent from './Components/EmptyBasket.component';

const CheckoutPage = () => {
	const basketProducts = useSelector(state => state.basketProducts)

	return (
		<Container maxWidth="xl" className='checkout-page'>
			{Object.entries(basketProducts).length > 0?
			(<CheckoutForm />):(<EmptyBasketComponent />)
			}				
		</Container>
	)
}

export default CheckoutPage;
