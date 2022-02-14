import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spinner
        variant="success"
        animation="border"
        style={{ width: '5vmax', height: '5vmax' }}
      />
    </div>
  )
}

export default Loader
