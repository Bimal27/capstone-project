import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import {AiFillGithub} from 'react-icons/ai';
import {AiFillLinkedin} from 'react-icons/ai'

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:bimalsah1996@gmail.com">
        <Button>Contact: bimalsah1196@gmail.com</Button>
          <h4 className="phone">Phone: 015904863262</h4>
      </a>
       <div className="gitLink mr-4">
         <AiFillGithub  style={{fontSize:'60px'}} />
           <a  href="https://github.com/Bimal27">Github</a>
       </div>
       <div className='gitLink'>
         <AiFillLinkedin style={{fontSize:'60px'}} />
            <a  href="https://www.linkedin.com/in/bimal-kumar-sah-b7a358197/">LinkedIn</a>
       </div>
    </div>
  );
};

export default Contact;
