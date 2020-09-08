import React from "react";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';


export default function Footer() {

  return (
    <div className='footer-container'>
      <div>
        <p>FML - ENJOY TASTY FOOD</p>
      </div>
      <div>
        <ul>
          <li><a href='http://facebook.se'><FaFacebookSquare size='1.5em'/></a></li>
          <li><a href='http://instagram.se'><FaInstagramSquare size='1.5em'/></a></li>
          <li><a href='http://twitter.com'><FaTwitterSquare size='1.5em'/></a></li>
        </ul>
      </div>
    </div>
  );
}
