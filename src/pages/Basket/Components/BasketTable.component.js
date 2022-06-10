import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BasketTableCell from './BasketTableCell.component';
import './style/BasketTable.scss'
import { v4 as uuidv4 } from 'uuid';
import { Paper, Typography, Box } from '@mui/material';

const BasketTable = ({data}) => {
	
	const basketProducts = useSelector(state => state.basketProducts)
	
	return (
		<Paper elevation={5} className='basket-table'>
			{Object.entries(basketProducts).length == 0? 
			<Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", height: "100%"}}>
				<Typography component="h2" variant="h3" sx={{color: 'gray'}}>سبد خرید خالی است</Typography>
			</Box>
			:
			(<>
			{Object.entries(basketProducts).map(item => {
				if (item[1].status == 'normal' || item[1].status == 'not-enough') {
					const getDataFromSource = data.find(pro => pro.id == item[0])
					return (
						<BasketTableCell key={uuidv4()} product={getDataFromSource} status={item[1].status} />
					)
				}
			})}
			{Object.entries(basketProducts).some(item => {
				if (item[1].status == 'not-existed' || item[1].status == 'deleted') {
					return (
						<h3 className='deleted-products-msg'>لیست کالاهای زیر به صورت اتومات از سبد خرید حذف می شوند</h3>
					)
				}
			})}
			{Object.entries(basketProducts).map(item => {
				if (item[1].status == 'not-existed' || item[1].status == 'deleted') {
					return (
						<BasketTableCell key={uuidv4()} product={item[1].product} quantity={null} status={item[1].status} />
					)
				}
			})}
			</>
			)
			}
		</Paper>
	)
}

export default BasketTable;

