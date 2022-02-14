import React from 'react'
import './About.css'
import { Button, Avatar } from '@material-ui/core'
import { FaFacebook } from 'react-icons/fa'
import picture from '../../images/founder.JPG'

const About = () => {
  const visitInstagram = () => {
    window.location = 'https://github.com/Bimal27'
  }
  return (
    <div className="aboutSection">
      <div className="aboutSectionGradient">
        <h1>About Us</h1>
      </div>

      <div />

      <div className="aboutSectionContainer">
        <div>
          <div>
            <Avatar
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src={picture}
              alt="Founder"
            />
            <h6>Bimal Kumar Sah</h6>
            <Button onClick={visitInstagram} color="primary">
              Visit Github
            </Button>
            <span>This is a sample ecommerce wesbite made by @BimalKumar.</span>
          </div>
          <div className="aboutSectionContainer2">
            <h2>Our Brands</h2>
            <a
              href="https://www.facebook.com/marketplace/?ref=app_tab"
              target="blank"
            >
              <FaFacebook className="facebookSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
