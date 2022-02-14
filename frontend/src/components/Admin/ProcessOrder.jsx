import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SideBar from './Sidebar'
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from '../../actions/orderAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import { Button } from 'react-bootstrap'
import { UPDATE_ORDER_RESET } from '../../actions/orderAction'
import './processOrder.css'
import Loader from '../Loader/Loader'

const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails)
  const { error: updateError, isUpdated } = useSelector((state) => state.order)

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set('status', status)

    dispatch(updateOrder(match.params.id, myForm))
  }

  const dispatch = useDispatch()
  const alert = useAlert()

  const [status, setStatus] = useState('')

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (updateError) {
      alert.error(updateError)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.success('Order Updated Successfully')
      dispatch({ type: UPDATE_ORDER_RESET })
    }

    dispatch(getOrderDetails(match.params.id))
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError])

  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === 'Delivered' ? 'block' : 'grid',
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <h4>Shipping Info</h4>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}
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
                <div className="confirmCartItems">
                  <h4>Your Cart Items:</h4>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div className="productInfo" key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link
                            className="productName"
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>{' '}
                          <span className="productQnty">
                            {item.quantity} X €{item.price} ={' '}
                            <b>€{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: order.orderStatus === 'Delivered' ? 'none' : 'block',
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h4>Process Order</h4>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === 'Processing' && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === 'Shipped' && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    variant="success"
                    type="submit"
                    disabled={
                      loading ? true : false || status === '' ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProcessOrder
