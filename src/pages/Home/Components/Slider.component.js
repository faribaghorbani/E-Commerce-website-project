import React from 'react'
import './style/Slider.scss'
import laptop1 from './../../../assets/images/gallery-1-2.jpg'
import laptop2 from './../../../assets/images/gallery-8-1.jpg'
import laptop3 from './../../../assets/images/laptop2.jpg'
import laptop4 from './../../../assets/images/laptop4.jpg'

const SliderComponent = () => {
    return (
		<div className='slider'>
			<div className='slider-track'>
				{/* the first set */}
				<div className='slide'>
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
				</div>
				{/* the second set */}
				<div className='slide'>
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
				</div>
			</div>
		</div>
    )
}

export default SliderComponent;
