import React from 'react'
import GallerySlider from './Components/GallerySlider.component';
import laptop1 from '../../assets/images/gallery-1-2.jpg'
import laptop2 from '../../assets/images/gallery-8-1.jpg'
import laptop3 from '../../assets/images/laptop2.jpg'
import laptop4 from '../../assets/images/laptop4.jpg'
import './Home.module.scss'
import { Box } from '@mui/system';
import CardComponent from './Components/Card.component';

const HomePage = () => {
const images = [
  {
    original: laptop1,
    thumbnail: laptop1,
  },
  {
    original: laptop2,
    thumbnail: laptop2,
  },
  {
    original: laptop3,
    thumbnail: laptop3,
  },
  {
    original: laptop4,
    thumbnail: laptop4,
  },
];

  return (
    <div>
      <GallerySlider images={images} />
      {/* <div className='body'>
        <div className="container">
          <div className="card">
              <div className="face face1">
                  <div className="content">
                      <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true" />
                      <h3>Design</h3>
                  </div>
              </div>
              <div className="face face2">
                  <div className="content">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                          <a href="#">Read More</a>
                  </div>
              </div>
          </div>
          <div className="card">
              <div className="face face1">
                  <div className="content">
                      <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/code_128.png?raw=true" />
                      <h3>Code</h3>
                  </div>
              </div>
              <div className="face face2">
                  <div className="content">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                          <a href="#">Read More</a>
                  </div>
              </div>
          </div>
          <div className="card">
              <div className="face face1">
                  <div className="content">
                      <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/launch_128.png?raw=true" />
                      <h3>Launch</h3>
                  </div>
              </div>
              <div className="face face2">
                  <div className="content">
                      <p>Lorem ipsum dolor si t amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                          <a href="#">Read More</a>
                  </div>
              </div>
          </div>
        </div>
      </div> */}
      {/* <Box>
        <CardComponent image={} title={"آلترا بوک"} />
      </Box> */}
    </div>
  )
}

export default HomePage;
