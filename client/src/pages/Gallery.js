import React from 'react';
import { Link } from 'react-router-dom';
import R1 from './assets/R1.jpeg';
import R2 from './assets/R2.jpeg';
import R3 from './assets/R3.jpeg';
import R4 from './assets/R4.jpeg';

const Gallery = () => {

  
    return (

        <div className="container px-2 py-2">
        <Link to="/">← Back to Products</Link>
            <div className="flex-row">
                <img src={R1} alt="Avatar" width={1000} />
            </div>
            <div className="flex-row">
                <img src={R2} alt="Avatar"/>
            </div>
            <div className="flex-row">
                <img src={R3} alt="Avatar"/>
            </div>
            <div className="flex-row">
                <img src={R4} alt="Avatar"/>
            </div>
        </div>
    );
  };
  
  
  
  export default Gallery;