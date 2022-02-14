import React from 'react'
import { Link } from 'react-router-dom'
import { login,clearErrors } from '../../actions/userAction'
import './auth.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../Loader/Loader'

const Login = ({ history, location }) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, loading, isAuthenticatedUser } = useSelector(
    (state) => state.user,
  )

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const loginSubmit = (e) => {
    // alert.success('Login successful!')
    e.preventDefault()
    dispatch(login(loginEmail, loginPassword))
  }

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(
    () => {
       if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (isAuthenticatedUser) {
        history.push(redirect)
      }
    },
    [dispatch, history, isAuthenticatedUser, redirect,alert,
    error]
  )

  return (
    <>
      {loading ? (<div className='mt-5'><Loader /> </div>):(
        <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={loginSubmit}>
            <h3>Login</h3>

            <div className="form-group">
              <label className="mb-2">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="mb-2">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="forgot-password text-right">
              Forgot <Link to="/resetpassword">password?</Link>
            </p>
            <p className="forgot-password text-right">
              Don't have a account <Link to="/register">Register?</Link>
            </p>
          </form>
        </div>
      </div>
      )}
    </>
  )
}

export default Login
