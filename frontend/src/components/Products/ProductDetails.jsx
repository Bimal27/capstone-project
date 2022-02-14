import React from 'react'
import Carousel from 'react-material-ui-carousel'

import { Button} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { newReview } from '../../actions/productAction'

import './ProductDetails.css'
import ReactStars from 'react-rating-stars-component'
import { GiShoppingCart } from 'react-icons/gi'
import ReviewCard from './ReviewCard'
import Loader from '../Loader/Loader'
import { addItemsToCart } from '../../actions/cartAction'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../actions/productAction'

const ProductDetails = ({ match }) => {

  const dispatch = useDispatch()
  const alert = useAlert()

  const { success} = useSelector(
    (state) => state.newReview,
  )

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const increaseQuantity = () => {
    if (product && product.product.Stock <= quantity) return

    const qty = quantity + 1
    setQuantity(qty)
  }

  const decreaseQuantity = () => {
    if (1 >= quantity) return

    const qty = quantity - 1
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity))
    alert.success('Item Added To Cart')
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }

  useEffect(() => {
    const singleProduct = async () => {
      let id = match.params.id
      if (id) {
        let response = await fetch('http://localhost:3001/product/' + id)
        let data = await response.json()
        setProduct(data)
        setIsLoading(false)
      }
    }

    if (success) {
      alert.success('Review Submitted Successfully')
      dispatch({ type: NEW_REVIEW_RESET })
    }
    singleProduct()
  }, [dispatch, match.params.id, alert, success])

  const reviewSubmitHandler = () => {
    const myForm = new FormData()

    myForm.set('rating', rating)
    myForm.set('comment', comment)
    myForm.set('productId', match.params.id)

    dispatch(newReview(myForm))

    setOpen(false)
  }

  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: '#c97f10',
    size: window.innerWidth < 600 ? 20 : 25,
    value: product && product.product.ratings,
    isHalf: true,
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product &&
                  product.product.images.map((item, i) => (
                    <div className="image">
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div>
              {product && (
                <>
                  <p>ProductId # {product.product._id}</p>
                  <h5>{product.product.name}</h5>
                  <p>
                    <b
                      className={
                        product.product.Stock < 1
                          ? 'text-danger'
                          : 'text-success'
                      }
                    >
                      {product.product.Stock < 1 ? 'Out of Stock' : 'InStock'}
                    </b>
                  </p>
                  <div className="d-flex">
                    <ReactStars {...options} />{' '}
                    <span className="mt-2 ml-3">
                      {' '}
                      ({product.product.numberOfReviews} Reviews){' '}
                    </span>
                  </div>
                  <hr></hr>
                  <div className="d-flex">
                    <h5>Price:</h5>
                    <h3 className="pricedetail ml-2">
                      {' '}
                      € {product.product.price}
                    </h3>
                  </div>
                  <p className="ml-5 mb-4" style={{ fontSize: '12px' }}>
                    Prices for items sold by Strivazon include VAT. Depending on
                    your delivery address, VAT may vary at Checkout.
                  </p>
                  <h5>Description:</h5>{' '}
                  <p style={{ fontSize: '14px' }}>
                    {product.product.description}
                  </p>
                  <hr></hr>
                  <div className="cart">
                    <h5 className="mr-2 mt-2" style={{ fontSize: '20px' }}>
                      Quantity:
                    </h5>
                    <button
                      className="btn btn-primary mr-1"
                      disabled={product.product.Stock === 1 ? true : false}
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      readOnly
                      className="input pl-3"
                      value={quantity}
                      type="number"
                    />
                    <button
                      className="btn btn-primary ml-1"
                      disabled={product.product.Stock === 1 ? true : false}
                      onClick={increaseQuantity}
                    >
                      +
                    </button>

                    <Button
                      variant="warning"
                      className="ml-4"
                      disabled={product.product.Stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to Cart <GiShoppingCart />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          <h3 className="reviewHeading">CUSTOMER'S REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
          </Dialog>

          {product && product.product.reviews[0] ? (
            <div className="reviews">
              {product.product.reviews &&
                product.product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews</p>
          )}
        </>
      )}
      <div className="mb-1 reviewButton">
        <button onClick={submitReviewToggle} className="submitReview">
          Add Review
        </button>
      </div>
    </>
  )
}
export default ProductDetails
