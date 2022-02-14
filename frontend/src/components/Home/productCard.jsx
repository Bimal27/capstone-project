import React from 'react'
import { Card } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component"
import { Link } from 'react-router-dom'



const ProductCard = ({product}) => {
    const options = {
    edit:false,
    color :"rgba(20,20,20,0.1)",
    activeColor :"#ffd700",
    size: window.innerWidth < 600 ? 10:20,
    value: product.ratings,
    isHalf: true,
}

    return (
        <div  id='product'>
            <Link to={`/product/${product._id}`}>
            <Card className='productCard'>
                <Card.Img variant="top" src={product.images[0].url} alt='productname' />
                <Card.Body>
                    <p className='productName'>{product.name}</p>
                    <div className='d-flex'>
                      <ReactStars {...options} /> <span className='mt-2 ml-3 review'> ({product.numberOfReviews} Reviews) </span>
                    </div>
                    <span className='price'>{product.price} €</span>
                </Card.Body>
            </Card>
            </Link>
        </div>
    )
}

export default ProductCard
