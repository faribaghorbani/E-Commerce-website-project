import React from 'react'
import Container from '@mui/material/Container';
import CheckoutForm from './Components/CheckoutForm.component';
import { Grid } from '@mui/material';
import './Checkout.scss'

const CheckoutPage = () => {

	return (
		<Container maxWidth="xl" className='checkout-page'>
			<Grid container spacing={2}>
				<Grid item sm={12}>
					<CheckoutForm />
				</Grid>
				{/* <Grid item md={3} sm={6}>
					<h1>hello</h1>
				</Grid> */}
			</Grid>
		</Container>
	)
}

export default CheckoutPage;
