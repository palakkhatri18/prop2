// About.js
import React from 'react';
import pic1 from '../static/pic1.jpg';
import '../css/AboutUs.css';

function About() {
  return (
    <div className="about-container">
      <img src={pic1} alt="Description" className='pic1' />
      </div>
  );
}

export default About;