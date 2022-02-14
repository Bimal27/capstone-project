import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import WebFont from 'webfontloader'
import NavBar from './components/Navbar/NavBar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Resetpassword from './components/Auth/Resetpassword'
import ProductDetails from './components/Products/ProductDetails'
import Newpassword from './components/Auth/NewPassword'
import Profile from './components/Profile/Profile'

import ProtectedRoute from './components/Route/ProtectedRoute'
import { useSelector } from 'react-redux'
import ProfileUpdate from './components/Profile/UpdateProfile'

import UpdatePassword from './components/Profile/UpdatePassword'
import Cart from './components/Cart/Cart'
import Shipping from './components/Cart/Shipping'
import ConformOrder from './components/Cart/ConformOrder'
import Contact from './components/Contacts/Contact'
import About from './components/About/About'

import Payment from './components/Cart/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSuccess from './components/Cart/OrderSuccess'
import configureStore from './store'
import { loadUser } from './actions/userAction'
import Products from './components/Home/Products'
import MyOrder from './components/Order/MyOrder'
import OrderDetails from './components/Order/OrderDetails'
import Dashboard from './components/Admin/Dashboard'
import ProductList from './components/Admin/productList'
import AddNewProduct from './components/Admin/addNewProduct'
import UpdateProduct from './components/Admin/updateProduct'
import OrderList from './components/Admin/OrderList'
import ProcessOrder from './components/Admin/ProcessOrder'
import UsersList from './components/Admin/UserList'
import UpdateUser from './components/Admin/UpdateUser'
import ProductReviews from './components/Admin/Review'
import Header from './components/Navbar/Header'

function App() {
  const { isAuthenticatedUser, user } = useSelector((state) => state.user)

  const [stripeApiKey, setStripeApiKey] = useState('')

  async function getStripeApiKey() {
    const { data } = await axios.get('http://localhost:3001/stripeapikey')

    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    })
   
    configureStore.dispatch(loadUser())
    getStripeApiKey()
  }, [])

  return <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/resetpassword" exact component={Resetpassword} />
        <Route path="/password/reset/:token" exact component={Newpassword} />
        <div>
          {isAuthenticatedUser ? <NavBar user={user} /> : <Header />}

          <Route path="/" exact component={Home} />
          <Route path="/product/:id" exact component={ProductDetails} />
          <ProtectedRoute path="/account" exact component={Profile} />

          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:keyword" component={Products} />

          <Route exact path="/me/:id" component={ProfileUpdate} />
          <Route exact path="/password/update" component={UpdatePassword} />

          <Route path="/cart" exact component={Cart} />
          <ProtectedRoute path="/shipping" exact component={Shipping} />
          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute path="/orders" exact component={MyOrder} />
          <ProtectedRoute path="/order/conform" exact component={ConformOrder} />
          {/* <ProtectedRoute path="/order/:id" exact component={OrderDetails} /> */}

          {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
              <Route path="/process/payment" exact component={Payment} />
            </Elements>}

          <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />

          <ProtectedRoute exact path="/admin/products" isAdmin={true} component={ProductList} />

          <ProtectedRoute exact path="/admin/product" isAdmin={true} component={AddNewProduct} />
          <ProtectedRoute exact path="/admin/product/:id" isAdmin={true} component={UpdateProduct} />
          <ProtectedRoute exact path="/admin/orders" isAdmin={true} component={OrderList} />
          <ProtectedRoute exact path="/admin/order/:id" isAdmin={true} component={ProcessOrder} />

          <ProtectedRoute exact path="/admin/users" isAdmin={true} component={UsersList} />

          <ProtectedRoute exact path="/admin/user/:id" isAdmin={true} component={UpdateUser} />

          <ProtectedRoute exact path="/admin/reviews" isAdmin={true} component={ProductReviews} />
          <Footer />
        </div>
      </Switch>
    </Router>;
}

export default App
