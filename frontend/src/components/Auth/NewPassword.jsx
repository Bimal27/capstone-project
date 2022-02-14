import React, { Component } from 'react'
import './auth.css'

class Newpassword extends Component {
  state = {
    newpassword: {
      password: '',
      conformpassword: '',
      passwordReset: false,
    },
  }

  handleInput = (key, value) => {
    this.setState({
      newpassword: {
        ...this.state.newpassword,
        [key]: value,
      },
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { match } = this.props

    let token = match.params.token

    try {
      let response = await fetch(
        'http://localhost:3001/password/reset/' + token,
        {
          method: 'PUT',
          body: JSON.stringify(this.state.newpassword),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.ok) {
        alert('Reset successful')
        this.setState({
          newpassword: {
            password: '',
            conformpassword: '',
            passwordReset: true,
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
        {!this.state.newpassword.passwordReset ? (
          <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={this.handleSubmit}>
                <h3>Set NewPassword</h3>

                <div className="form-group">
                  <label>Enter your new password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={this.state.newpassword.password}
                    onChange={(e) =>
                      this.handleInput('password', e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Conform your password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Conform password"
                    value={this.state.newpassword.conformPassword}
                    onChange={(e) =>
                      this.handleInput('conformPassword', e.target.value)
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </form>
            </div>
          </div>
        ) : (
          this.props.history.push('/login')
        )}
      </>
    )
  }
}

export default Newpassword
