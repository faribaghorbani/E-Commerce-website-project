import React, { useEffect, useState } from 'react'
import './Home.module.scss'
import GallerySlider from './Components/GallerySlider.component';
import laptop1 from '../../assets/images/gallery-1-2.jpg'
import laptop2 from '../../assets/images/gallery-8-1.jpg'
import laptop3 from '../../assets/images/laptop2.jpg'
import laptop4 from '../../assets/images/laptop4.jpg'
import SliderComponent from './Components/Slider.component.js'
import anime from 'animejs'
import ProductCard from '../../components/ProductCard.component'
import axios from 'axios';

const HomePage = () => {
	const [laptops, setLaptops] = useState([])
	const [phones, setPhones] = useState([])

	// const animation = () => {
	// 	anime({
	// 		targets: 'svg path',
	// 		d: [
	// 		  { value: 'M0 223L21.5 218.5C43 214 86 205 128.8 203.8C171.7 202.7 214.3 209.3 257.2 217.5C300 225.7 343 235.3 385.8 240.7C428.7 246 471.3 247 514.2 233.3C557 219.7 600 191.3 642.8 186.7C685.7 182 728.3 201 771.2 209.7C814 218.3 857 216.7 878.5 215.8L900 215L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z' },
	// 		  { value: 'M0 143L21.5 138.5C43 134 86 125 128.8 119.7C171.7 114.3 214.3 112.7 257.2 123C300 133.3 343 155.7 385.8 154.7C428.7 153.7 471.3 129.3 514.2 141.3C557 153.3 600 201.7 642.8 229.5C685.7 257.3 728.3 264.7 771.2 246.5C814 228.3 857 184.7 878.5 162.8L900 141L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z' }
	// 		],
	// 		easing: 'linear',
	// 		duration: 2000,
	// 		direction: 'alternate',
	// 		delay: 0,
	// 		loop: true
	// 	  });
	// }

	useEffect(() => {
		const requests = [
			axios.get('/products?category.main=laptop&_page=1&_limit=6'),
			axios.get('/products?category.main=phone')
		]
		Promise.all(requests)

		.then(([laptops, phones]) => {
			console.log(laptops.data)
			setLaptops(laptops.data)
			console.log(phones.data)
			setPhones(phones.data)
		})
		
	}, [])


    return (
        <div>
			  	<SliderComponent cards={laptops} delay={'0s'}/>
			  	<SliderComponent cards={laptops} delay={'3s'}/>
				  {/* <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1">
					  <path d="M0 223L21.5 218.5C43 214 86 205 128.8 203.8C171.7 202.7 214.3 209.3 257.2 217.5C300 225.7 343 235.3 385.8 240.7C428.7 246 471.3 247 514.2 233.3C557 219.7 600 191.3 642.8 186.7C685.7 182 728.3 201 771.2 209.7C814 218.3 857 216.7 878.5 215.8L900 215L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z" fill="#fa7268"></path>
				  </svg> */}

				{/* <img src={svg} /> */}
				{/* <ProductCard product={phones[0]}/> */}
        </div>
    )
}

export default HomePage;
