import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import './Payment.css'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import EventIcon from '@material-ui/icons/Event'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { createOrder, clearErrors } from '../../actions/orderAction'
import { removeItemsFromCart } from '../../actions/cartAction'

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

  const dispatch = useDispatch()

  const stripe = useStripe()
  const elements = useElements()
  const payBtn = useRef(null)

  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.newOrder)

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  }

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }

  const emptyCart = () => {
         localStorage.removeItem('cartItems')
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    payBtn.current.disabled = true

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        'http://localhost:3001/payment/process',
        paymentData,
        config,
      )

      const client_secret = data.client_secret

      if (!stripe || !elements) return

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      })

      if (result.error) {
        payBtn.current.disabled = false

        alert.error(result.error.message)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }

          dispatch(createOrder(order))

          history.push('/success')
        } else {
          alert("There's some issue while processing payment")
        }
      }
    } catch (error) {
      payBtn.current.disabled = false
      alert.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error])

  return (
    <>
      <div className="paymentContainer">
        <form
          className="paymentForm shadow-lg p-3 mb-5 bg-white rounded"
          onSubmit={(e) => submitHandler(e)}
        >
          <h6>Card Info</h6>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - €${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
            onClick={() => emptyCart()}
          />
        </form>
      </div>
    </>
  )
}

export default Payment
