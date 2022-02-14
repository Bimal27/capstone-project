import React from 'react'
import {useSelector } from 'react-redux'
import './ConformOrder.css'
import { Link } from 'react-router-dom'


const ConformOrder = ({ history}) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  )

  const shippingCharges = subtotal > 30 ? 0 : 4

  const totalPrice = subtotal + shippingCharges

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    }

    sessionStorage.setItem('orderInfo', JSON.stringify(data))

    history.push('/process/payment')
  }

  return (
    <>
      <div className="conformOrderPage">
        <div>
          <div className="conformshippingArea">
            <h4>Shipping Info</h4>
            <div className="conformshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="conformCartItems">
            <h4>Your Cart Items:</h4>
            <div className="conformCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} X €{item.price} ={' '}
                      <b>€{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <h4>Order Summery</h4>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>€{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>€{shippingCharges}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>€{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConformOrder
