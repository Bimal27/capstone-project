import React, { Component } from 'react'
import './auth.css'

export default class Resetpassword extends Component {
  state = {
    forgotpassword: {
      email: '',
    },
  }

  handleInput = (key, value) => {
    this.setState({
      forgotpassword: {
        ...this.state.forgotpassword,
        [key]: value,
      },
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.forgotpassword)

    try {
      let response = await fetch('http://localhost:3001/forgotpassword', {
        method: 'POST',
        body: JSON.stringify(this.state.forgotpassword),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        alert('Email sent, check your email and click on the link below')
        this.setState({
          forgotpassword: {
            email: '',
          },
        })
      } else {
        alert('SOMETHING WENT WRONG ON THE SERVER')
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
              <h3>Reset Password</h3>

              <div className="form-group">
                <label>Enter your email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={this.state.forgotpassword.email}
                  onChange={(e) => this.handleInput('email', e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}
