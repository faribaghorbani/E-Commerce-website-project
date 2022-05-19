import React from 'react'
import GallerySlider from './Components/GallerySlider.component';
import laptop1 from '../../assets/images/gallery-1-2.jpg'
import laptop2 from '../../assets/images/gallery-8-1.jpg'
import laptop3 from '../../assets/images/laptop2.jpg'
import laptop4 from '../../assets/images/laptop4.jpg'

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
      
    </div>
  )
}

export default HomePage;
