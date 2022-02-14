import React from 'react'
import { Link } from 'react-router-dom'
import './auth.css'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { Form } from 'react-bootstrap'

const Register = ({ history }) => {
  const alert = useAlert()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    registered: false,
  })

  const [avatar, setAvatar] = useState('/profile.png')
  const [avatarPreview, setAvatarPreview] = useState('/profile.png')

  const registerDataChange = (e, propertyName) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [propertyName]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append('avatar', avatar)
      formData.append('name', user.name)
      formData.append('email', user.email)
      formData.append('password', user.password)
      formData.append('registered', user.registered)

      console.log(formData)

      let response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        alert.success('Registration Successfull')
        setUser({
          name: '',
          email: '',
          password: '',
          registered: true,
        })
      } else {
        alert.show('SOMETHING WENT WRONG ON THE SERVER')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!user.registered ? (
        <div>
          <div className="auth-wrapper">
            <div className="auth-inner" style={{marginTop:'-64px'}}>
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                  <label>User name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="User name"
                    value={user.name}
                    onChange={(e) => registerDataChange(e, 'name')}
                  />
                  <Form.Text className="text-muted">
                    User name should be at least 5 chars long.
                  </Form.Text>
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="Enter email"
                    value={user.email}
                    onChange={(e) => registerDataChange(e, 'email')}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </div>

                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    required
                    className="form-control"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={(e) => registerDataChange(e, 'password')}
                  />
                  <Form.Text className="text-muted">
                    Should contain at least 8 chars long
                  </Form.Text>
                </div>

                <div className="mb-3" id="registerImage">
                  <img
                    src={avatarPreview}
                    className="mr-2"
                    alt="Avatar Preview"
                  />
                  <input
                    className="mt-2"
                    required
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
                <p className="forgot-password text-right">
                  Already registered <Link to="/login">Login?</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      ) : (
        history.push('/login')
      )}
    </>
  )
}
export default Register
