import React, { useEffect } from 'react'
import { useSelector} from 'react-redux'
import Loader from '../Loader/Loader'
import { FaUserEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Profile.css'

const Profile = ({ history }) => {

  const { user, isAuthenticatedUser, loading } = useSelector(
    (state) => state.user,
  )

  useEffect(() => {
    if (isAuthenticatedUser === false) {
      history.push('/login')
    }
  }, [history, isAuthenticatedUser])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profileSectionGradient"></div>
          <h1 className="profileHeading">My Profile</h1>
          <div></div>
          <div className="profileContainer">
            <div>
              <img src={user.avatar.url} alt={user.name} />
              <b>
                <p className="mt-3">{user.name}</p>
              </b>
            
            </div>

            <div className="profileContentContainer">
              <div className="ml-auto editProfile">
                <Link to={`/me/${user._id}`}>
                  <FaUserEdit className="mr-1" />
                  Edit Profile
                </Link>
              </div>
              <div>
                <h5>Full Name</h5>
                <p>{user.name}</p>
              </div>
              <div className="my-3">
                <h5>Email</h5>
                <p>{user.email}</p>
              </div>
              <div>
                <h5>Joined On</h5>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Profile
