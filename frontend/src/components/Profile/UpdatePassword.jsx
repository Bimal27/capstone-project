import React, { useState, useEffect } from 'react'
import './UpdatePassword.css'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updatePassword } from '../../actions/userAction'
import { UPDATE_PASSWORD_RESET } from '../../actions/userAction'

import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { useAlert } from 'react-alert'

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, isUpdated, loading } = useSelector((state) => state.profile)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [conformPassword, setConformPassword] = useState('')

  const updatePasswordSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set('oldPassword', oldPassword)
    myForm.set('newPassword', newPassword)
    myForm.set('conformPassword', conformPassword)

    dispatch(updatePassword(myForm))
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success('Password Updated Successfully')

      history.push('/account')

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      })
    }
  }, [dispatch, error, alert, history, isUpdated])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Conform Password"
                    required
                    value={conformPassword}
                    onChange={(e) => setConformPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UpdatePassword
