import React from 'react'
import './ProfileUpdate.css'
import Loader from '../Loader/Loader'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser } from '../../actions/userAction'
import { useAlert } from 'react-alert'

const ProfileUpdate = ({ history, match }) => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState()
  const [avatarPreview, setAvatarPreview] = useState('/profile.png')

  const { loading } = useSelector((state) => state.profile)

  const updateProfileSubmit = (e) => {
    e.preventDefault()
    alert.success('Profile Updated Successfully')

    const myForm = new FormData()

    myForm.set('name', name)
    myForm.set('email', email)
    myForm.set('avatar', avatar)
    dispatch(updateProfile(match.params.id, myForm))
    dispatch(loadUser())
    history.push('/account')
  }

  const updateProfileDataChange = (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAvatarPreview(user.avatar.url)
    }
  }, [user])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="profile-wrapper">
            <div className="profile-inner">
              <form
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <h3 className="updateProfileHeading">Update Profile</h3>

                <div className="form-group">
                  <label>User name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3" id="registerImage">
                  <img
                    src={avatarPreview}
                    className="mr-2"
                    alt="Avatar Preview"
                  />
                  <input
                    className="mt-2"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default ProfileUpdate
