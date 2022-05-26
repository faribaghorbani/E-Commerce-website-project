import React from 'react'
import './style/ProductCard.scss'

const ProductCard = ({product, height}) => {
    return (
		<div className='product-card' style={{height: height? '100%': '400px'}}>
			<img className='thumbnail' src={'http://localhost:3002/files/' + product?.thumbnail} />
			<div className='info'>
				<h4 className='title'>{product?.name}</h4>
				<h5 className='price'>{product?.price} تومان</h5>
			</div>
		</div>
    )
}

export default ProductCard;
