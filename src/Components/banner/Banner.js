import React from 'react';
import bg from '../../assets/banner2.jpg'
import Carousel from './Carousel';

const Banner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center text-center"
      style={{
        backgroundImage: `url("${bg}")`,
        height: "450px",
      }}
    >
      <div className="container mt-5">
        <div className="row  mt-6">
          <div className="col" style={{fontWeight: "800"}}>
            <h1 style={{fontWeight: "bolder"}}>Crypto Hunter</h1>
            <p style={{color:'grey'}}>Get all the Info regarding your favourite Crypto Currency</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
