import React from 'react'
import './style/Slider.scss'
import ProductCard from '../../../components/ProductCard.component'
import { v4 as uuidv4 } from 'uuid';


const SliderComponent = ({cards, delay}) => {


    return (
		<div className='slider'>
			<div className='slider-track' style={{animationDelay: delay}}>
			
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
