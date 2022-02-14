import React, { useEffect } from 'react'
import './orderDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, clearErrors } from '../../actions/orderAction'
import { useAlert } from "react-alert";

import Loader from '../Loader/Loader'

const OrderDetails = ({ match }) => {
  const { order,error, loading } = useSelector((state) => state.orderDetails)

  const dispatch = useDispatch()
    const alert = useAlert()

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(getOrderDetails(match.params.id))
   
  }, [dispatch, error,alert, match.params.id])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h3>Order #{order && order._id}</h3>
              <h4>Shipping Info</h4>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div></div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h4>Payment</h4>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === 'succeeded'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === 'succeeded'
                      ? 'PAID'
                      : 'NOT PAID'}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <h4>Order Status</h4>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === 'Delivered'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h4>Order Items:</h4>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{' '}
                      <span>
                        {item.quantity} X €{item.price} ={' '}
                        <b>€{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )} 
    </>
  )
}

export default OrderDetails
