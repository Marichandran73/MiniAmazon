import React from 'react';

import Static from './Static';
import '../Products/Card.css';

const Card = ({ name, price, image }) => {
  
  return (
  
      <div className="Pant-card">

      <div className="card">
        <img src={image} alt={name} className="product-image" />
        <div className="card-body">
          
          <h3>{name}</h3>
          <p>{price}</p> 
          <button>Add to Cart</button>
        </div>
      </div>
     
   </div>
    
  );
};

export default Card;
