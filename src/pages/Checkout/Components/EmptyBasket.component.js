import React from 'react'
import { Paper } from '@mui/material'
import './style/EmptyBasket.scss'

const EmptyBasketComponent = () => {
    return (
        <Paper elevation={5} className={'checkout-empty-bakset'}>
			<div className='banner'>
				فرم تکمیل خرید
			</div>
            <h1 className='statement'>کالایی در سبد خرید موجود نیست</h1>
		</Paper>
    )
}

export default EmptyBasketComponent
