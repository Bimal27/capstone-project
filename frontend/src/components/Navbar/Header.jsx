import React from 'react'
import { Navbar, Form, FormControl, Nav, Button, NavDropdown } from 'react-bootstrap'
import logo from '../../images/logo2.png'
import { useState } from 'react'
import './Navbar.css'
import { Link, withRouter } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'


const NavBar = ({ history }) => {
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
                  <Link to='/login'><Button className='btn btn-success ml-4 mt-3'>SignUp</Button></Link>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </>
  )
}

export default withRouter(NavBar)