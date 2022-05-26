import React from 'react'
import './style/ProductCard.scss'
import { useNavigate } from 'react-router-dom'


const ProductCard = ({product, height}) => {

	const navigate = useNavigate()

	const handleNavigation = (item) => {
		navigate(`/products/${item.category.main}/${item.category.second}/${item.id}`)
	}

    return (
		<div className='product-card' style={{height: height}} onClick={() => handleNavigation(product)}>
			<img className='thumbnail' src={'http://localhost:3002/files/' + product?.thumbnail} />
			<div className='info'>
				<h4 className='title'>{product?.name}</h4>
				<h5 className='price'>{product?.price} تومان</h5>
			</div>
		</div>
    )
}

export default ProductCard;
