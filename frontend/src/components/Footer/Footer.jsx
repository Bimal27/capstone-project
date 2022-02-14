import React from 'react'
import playStore from '../../images/playstore.png'
import appStore from '../../images/Appstore.png'
import logo from '../../images/logo2.png'
import { BsInstagram } from 'react-icons/bs'
import { IoLogoYoutube } from 'react-icons/io'
import { FaFacebook } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>
      <div className="midFooter">
        <img
          src={logo}
          alt="logo"
          style={{ height: '110px', borderRadius: '52px' }}
        />
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; BimalKumar</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.facebook.com/">
          <BsInstagram className="mx-3" />
          Instagram
        </a>
        <a href="https://www.facebook.com/">
          <IoLogoYoutube className="mx-3 " /> YouTube
        </a>
        <a href="https://www.facebook.com/">
          <FaFacebook className="mx-3" />
          Facebook
        </a>
      </div>
    </footer>
  )
}

export default Footer
