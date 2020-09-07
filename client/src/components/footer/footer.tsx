import React from "react";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';


export default function Footer() {

  return (
    <div className='footer-container'>
      <div>
        <h3>FML - ENJOY TASTY FOOD</h3>
      </div>
      <div>
        <ul>
          <li><a href='http://facebook.se'><FaFacebookSquare size='3em'/></a></li>
          <li><a href='http://instagram.se'><FaInstagramSquare size='3em'/></a></li>
          <li><a href='http://twitter.com'><FaTwitterSquare size='3em'/></a></li>
        </ul>
      </div>
    </div>
  );
}
