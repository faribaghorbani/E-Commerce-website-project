import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BasketTableCell from './BasketTableCell.component';
import './style/BasketTable.scss'
import { v4 as uuidv4 } from 'uuid';

const BasketTable = ({data}) => {
	
	const basketProducts = useSelector(state => state.basketProducts)

	useEffect(() => {
		console.log(basketProducts)
	}, [basketProducts])
	
	return (
		<div className='basket-table'>
			{Object.entries(basketProducts).map(item => {
				if (item[1].status == 'normal' || item[1].status == 'not-enough') {
					const getDataFromSource = data.find(pro => pro.id == item[0])
					return (
						<BasketTableCell key={uuidv4()} product={getDataFromSource} status={item[1].status} />
					)
				}
			})}
			<h3>لیست کالاهای زیر به صورت اتومات از سبد خرید حذف می شوند</h3>
			{Object.entries(basketProducts).map(item => {
				if (item[1].status == 'not-existed' || item[1].status == 'deleted') {
					return (
						<BasketTableCell key={uuidv4()} product={item[1].product} quantity={null} status={item[1].status} />
					)
				}
			})}
		</div>
	)
}

export default BasketTable;

