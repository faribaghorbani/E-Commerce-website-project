import React from 'react'
import './style/Slider.scss'
import laptop1 from './../../../assets/images/gallery-1-2.jpg'
import laptop2 from './../../../assets/images/gallery-8-1.jpg'
import laptop3 from './../../../assets/images/laptop2.jpg'
import laptop4 from './../../../assets/images/laptop4.jpg'
import ProductCard from '../../../components/ProductCard.component'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'


const SliderComponent = ({cards, delay}) => {
	const navigate = useNavigate()

	const handleNavigation = (item) => {
		navigate(`/products/${item.category.main}/${item.category.second}/${item.id}`)
	}

    return (
		<div className='slider'>
			<div className='slider-track' style={{animationDelay: delay}}>
				{/* the first set */}
				{/* <div className='slide'>
					<img src={laptop1} />
				</div>
				<div className='slide'>
					<img src={laptop2} />
				</div>
				<div className='slide'>
					<img src={laptop3} />
				</div>
				<div className='slide'>
					<img src={laptop4} />
				</div> */}
				{/* the second set */}
				{/* <div className='slide'>
					<img src={laptop1} />
				</div>
				<div className='slide'>
					<img src={laptop2} />
				</div>
				<div className='slide'>
					<img src={laptop3} />
				</div>
				<div className='slide'>
					<img src={laptop4} />
				</div> */}
				{cards?.map(item => {
					return (
						<div key={uuidv4()} className='slide' onClick={() => handleNavigation(item)}>
							<ProductCard product={item} height={true} />
						</div>
					)
				})}
				{cards?.map(item => {
					return (
						<div key={uuidv4()} className='slide'>
							<ProductCard product={item} height={true} onClick={() => handleNavigation(item)} />
						</div>
					)
				})}

			</div>
		</div>
    )
}

export default SliderComponent;
