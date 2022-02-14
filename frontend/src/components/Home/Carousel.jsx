import React from 'react'
import { Carousel } from 'react-bootstrap'
import product from '../../images/watch1.png'
import './Home.css'
import './Carousel.css'

const CarouselHome = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
            src='https://m.media-amazon.com/images/I/51Jb3QOivxL._SX3000_.jpg'
            alt="product"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={product}
            alt="product1"
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.news18.com/ibnlive/uploads/2021/05/1620309471_vivo-feature-image.jpg?im=FitAndFill,width=3000,height=1200"
            alt="product"
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default CarouselHome
