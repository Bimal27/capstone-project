import React from 'react'
import './Cart.css'
import { useSelector, useDispatch } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import { Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Cart = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cartItems)

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1
    if (stock <= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newQty))
  }

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1
    if (1 >= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newQty))
  }

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id))
  }

  const checkout = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      {cart.length === 0 ? (
        <>
          <p className="noCartItems">
            You have no items in the cart.... <Link to="/">View Products</Link>
          </p>
        </>
      ) : (
        <>
          <div className="cartHeader">
            <p>Product</p>
            <p className="quantity">Quantity</p>
            <p>Price</p>
          </div>
          <div>
            {cart.map((item, id) => (
              <div className="cartItem" key={item.product}>
                <div className="d-flex align-items-start product">
                  <img
                    src={item.image}
                    style={{
                      width: '100px',
                      height: 'auto',
                      objectFit: 'cover',
                    }}
                    className="image"
                    alt='productImg'
                  />
                  <div className="products">
                    <h6>{item.name}</h6>
                    <p>Price: € {item.price}</p>
                    <Button
                      variant="danger"
                      className="mb-5"
                      item={item}
                      onClick={() => deleteCartItems(item.product)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
                <div className="d-flex align-items-center qntyButton">
                  <button
                    className="px-2 btn btn-primary"
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }
                  >
                    -
                  </button>
                  <input
                    readOnly
                    className="inputcart"
                    value={item.quantity}
                    type="number"
                  />
                  <button
                    className="px-2 btn btn-primary"
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                </div>

                <p className="ml-4 subTotalPrice">{`€${
                  item.price * item.quantity
                }`}</p>
              </div>
            ))}
          </div>
          <div className="totalBlock">
            <div className="cartGross">
              <div></div>
              <div className="cartGrossBox">
                <p>Total</p>
                <p>{`€${cart.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0,
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkout}>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Cart
