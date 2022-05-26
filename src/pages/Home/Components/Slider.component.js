import React from 'react'
import './style/SliderLeft.scss'
import ProductCard from '../../../components/ProductCard.component'
import { v4 as uuidv4 } from 'uuid';


const SliderComponent = ({cards, dir}) => {

    return (
		<div className='slider'>
			<div className='slider-track'>
			
				{cards?.map(item => {
					return (
						<div key={uuidv4()} className='slide'>
							<ProductCard product={item} height={'100%'} />
						</div>
					)
				})}
				{cards?.map(item => {
					return (
						<div key={uuidv4()} className='slide'>
							<ProductCard product={item} height={'100%'}  />
						</div>
					)
				})}

			</div>
		</div>
    )
}

export default SliderComponent;
