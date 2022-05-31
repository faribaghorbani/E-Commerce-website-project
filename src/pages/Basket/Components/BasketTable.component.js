import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './style/BasketTable.scss'

const BasketTable = ({data}) => {
	
	const basketProducts = useSelector(state => state.basketProducts)

	useEffect(() => {
		console.log(basketProducts)
	}, [])
	
	return (
		<div className='basket-table'>
			{}
		</div>
	)
}

export default BasketTable;

