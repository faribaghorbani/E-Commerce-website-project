import React from 'react'
import { useSelector } from 'react-redux';

const BasketTable = () => {
	const basketProducts = useSelector(state => state.basketProducts)
	
	return (
		<div>
		
		</div>
	)
}

export default BasketTable;

