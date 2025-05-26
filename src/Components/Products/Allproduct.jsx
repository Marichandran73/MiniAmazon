import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Allproduct = ({ title, images, caption }) => {
  const navigate = useNavigate();

 const handleClick = (item) => {
  if (item.id) {
    navigate(`/product/${item.id}`);
  } else {
    alert('Product ID not found');
  }
};


  return (
    <div className="card-container">
      <div className="pro-card">
        <h1>{title}</h1>

        <div className="main-first">
          
          {images && images.length > 0 ? (
            images.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => handleClick(item)}
                style={{ cursor: 'pointer' }}
                className="product-card"
              >
                <img
                  className="product-img"
                  src={item.url || item.urls}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            ))
          ) : (
            <p>No products to display.</p>
          )}
        </div>

        <p className="Click-card">{caption}</p>
      </div>
    </div>
  );
};

export default Allproduct;
