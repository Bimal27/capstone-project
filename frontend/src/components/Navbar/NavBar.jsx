import React from 'react'
import { Navbar, Form, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import logo from '../../images/logo2.png'
import { AiOutlineLogout } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useState } from 'react'
import { logout } from '../../actions/userAction'
import './Navbar.css'
import { Link, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { useAlert } from 'react-alert'
import { BsSearch } from 'react-icons/bs'

const NavBar = ({ history, user }) => {
  const alert = useAlert()
  const [keyword, setKeyword] = useState('')

  

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/products/${keyword}`)
      setKeyword('')
    } else {
      history.push('/')
    }
  }

  const dispatch = useDispatch()

  // const {user} = useSelector(state => state.user)
  const cartLength = useSelector((state) => state.cart.cartItems.length)

  function logoutUser() {
    dispatch(logout())
    alert.success('Logout Successfully')

    setTimeout(() => {
      history.push('/login')
    }, 500)
  }
  return (
    <>
        <Navbar id="navbar" collapseOnSelect expand="lg navbar-dark">
          <Navbar.Brand>
            <img
              src={logo}
              style={{
                width: '86px',
                height: '58px',
                objectFit: 'cover',
                marginLeft: '12px',
                marginRight: '12px',
              }}
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              
              {user.role === 'admin' && (
                <Link to="/admin/dashboard">Dashboard</Link>
              )}
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contacts</Link>
            </Nav>
            <Nav id="interaction">
              <Form onSubmit={searchSubmitHandler} className="d-flex">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2 mt-3"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />

                <button className="btn btn-success mr-sm-2 my-3" type="submit">
                  <BsSearch />
                </button>
              </Form>
              {user.role !== 'admin' && (<Link to="/cart" className='cartLink'>
                <Button
                  className="mt-2 ml-3"
                  style={{ color: 'orange' }}
                >
                  {' '}
                  <AiOutlineShoppingCart style={{ fontSize: '2em' }} />
                  <h5 className="ml-1 mb-3">{cartLength}</h5>
                </Button>
              </Link>)}
              <NavDropdown
                title={
                  <img
                    src={user.avatar.url ? user.avatar.url : '/profile.png'}
                    alt="profile"
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50px',
                     
                    }}
                    id="avatar"
                  />
                }
                id="collasible-nav-dropdown"
              >
                <p className="text-light userheading">
                  Signed in as <br></br>{' '}
                  <span className="username">
                    {user.name ? user.name : 'Guest'}
                  </span>
                </p>

                <NavDropdown.Item onClick={() => history.push('/account')}>
                  My Account
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="my-2"
                  onClick={() => history.push('/orders')}
                >
                  My Orders
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => history.push('/password/update')}
                >
                  Change Password
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={logoutUser}>
                  Log Out <AiOutlineLogout className="ml-2" />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

    </>
  )
}

export default withRouter(NavBar)
