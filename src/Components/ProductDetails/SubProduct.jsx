import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Static2 from '../Products/Static2.jsx';
import './Static/CSS/SubProduct.css';
import { MdDelete } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

import Navbar from '../Pages/MyNavbar';
import Footer from '../Pages/Footer';
import Header from '../Pages/Header';
import CartSidebar from './CardSidebar'; 
import '../Pages/NavbarStyles.css';

const SubProduct = () => {
  const { id } = useParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
   


  const [cartItems, setCartItems] = useState([]);

  const openCart = () => {
    if (!cartItems.length) {
      setCartItems([{ ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const closeCart = () => setIsCartOpen(false);

  const saveBill = () => {
    alert('Bill was saved successfully!');
    setCartItems([]);
    setIsCartOpen(false);
  };


  const product = Static2.flatMap(section => section.images || [])
    .flatMap(image => image.products || [])
    .find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }


  const totalBill = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <>
      <div className="Nav_Section">
        <Navbar onCartClick={openCart} />
        <Header />
      </div>

      <div className="Sub-Head">
        <h1>Selected Product</h1>
        <div className="sub-Card">
          <div className="Sub-left">
            <img src={product.urls} alt={product.name} loading="lazy" />
            <br />
            <div>
              <button><FaArrowLeft /></button>
              <button><MdDelete className="dlt-btn" /></button>
              <button><FaArrowRight /></button>
            </div>
          </div>

          <div className="Sub-right">
            <h2>{product.name}</h2>
            <p>Price: ₹{product.price} {product.offer}</p>
            <p>MRP: <del>₹{product.mrp}</del></p>
            <button className="right-limited">Limited time deal</button>
            <p>{product.delivery}</p>
            <p>{product.services}</p>
            <p>Rating : 7/10</p>


            <button className="add-btn" onClick={openCart}>
              Go To Billing
            </button>
          </div>
        </div>
      </div>

      <Footer />

      
      <CartSidebar
        isOpen={isCartOpen}
        closeCart={closeCart}
        cartItems={cartItems}
        saveBill={saveBill}
        totalBill={totalBill}
      />
    </>
  );
};

export default SubProduct;
