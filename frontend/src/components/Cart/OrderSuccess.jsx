import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import './OrderSuccess.css'

import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <h4>Your Order has been Placed successfully </h4>
      <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess
