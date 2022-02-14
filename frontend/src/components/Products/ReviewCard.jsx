import ReactStars from 'react-rating-stars-component'
import React from 'react'
import profilePic from '../../images/profile.png'

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  }

  return (
    <div className="reviewCard">
      <div className="d-flex">
        <img src={profilePic} alt="User" />
        <p className="userName">{review.name}</p>
      </div>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  )
}

export default ReviewCard
