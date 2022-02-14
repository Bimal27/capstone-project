import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {
  productsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productDetailsReducer,
  productReviewsReducer,
  reviewReducer,
} from '../reducers/productReducer'
import {
  allUsersReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from '../reducers/userReducer'
import { cartReducer } from '../reducers/cartReducer'
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from '../reducers/orderReducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 1)
export const initialState = {
  products: { stock: [], isError: false, isLoading: false },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
}

const mainReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
})

// 2)
const configureStore = createStore(
  mainReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
)

export default configureStore
