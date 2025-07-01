import React, { useState, useEffect } from 'react';
import './Components/Pages/SignupLogin.css';
import Navbar from './Components/Pages/MyNavbar';
import Header from './Components/Pages/Header';

import './Components/Pages/Header.css';

import { useCart } from './Context/CartContext'


import './Components/Products/Card.css';

import CartSidebar from './Components/ProductDetails/CardSidebar';


import Static2 from './Components/Products/Static2';
import Allproduct from './Components/Products/Allproduct';



import Footer from './Components/Pages/Footer';

const Dashboard = () => {
  const [currDate, setCurrDate] = useState(null); 

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrDate(date.toLocaleString()); 
    };

    updateTime(); 
    const interval = setInterval(updateTime, 1000); 

    return () => clearInterval(interval); 
  }, []);

  const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

  const {
    cartItems,
    isCartOpen,
    openCart,
    closeCart,
    saveBill,
    totalBill,
    handleQuantityChange
  } = useCart();

  return (
    <>
    <div className="Nav_Section">
    <Navbar
         num={cartItems.reduce((a, b) => a + b.quantity, 0)}
         onCartClick={openCart}
          />
    <Header/>
    </div>

    <div className="Container">
  
    <div className="second">
        <h1>WELCOME TO StyleMart </h1>
        <h3>The Date is: {currDate}</h3> 
    </div>
  
</div>


  <div className="pro-grid">
  {Static2.map((section) => (
    <Allproduct 
      key={section.id} 
      title={section.title} 
      description={section.description} 
      images={section.images} 
      caption={section.caption} /> 
  ))}
</div>
<CartSidebar
        isOpen={isCartOpen}
        closeCart={closeCart}
        cartItems={cartItems}
        saveBill={saveBill}
        totalBill={calculateTotal(cartItems)}
        onQuantityChange={handleQuantityChange}
      />

<Footer/>
    </>
  );
};

export default Dashboard;
