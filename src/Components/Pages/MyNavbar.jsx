import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
import './NavbarStyles.css';
import { FaCartShopping } from "react-icons/fa6";

import logo1 from "../assets/images/Shop-Logo.jpg";


const MyNavbar = ({ search, num, onCartClick }) => {
  return (
    <div className="navbar">
      <div className="logo">
        <img
          src={logo1}
          alt="Company Logo"
        />
      </div>

      <div className="location">
        <FaMapMarkerAlt />
        <div>
          <span className="small-text">Deliver to</span>
          <span className="bold-text">India</span>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => search(e.target.value)}
        />
        <button><FaSearch /></button>
      </div>

      <div className="right-menu">
        <div className="menu-item">
          <span className="small-text">Hello, Sign in</span>
          <span className="bold-text">Account & Lists</span>
        </div>
        <div className="menu-item">
          <span className="small-text">Returns</span>
          <span className="bold-text">& Orders</span>
        </div>
        
      </div>
      <div className="menu-item cart-icon">
          <FaCartShopping  onClick={onCartClick} />
          <h6 className="head-count">{num}</h6>
        </div>
    </div>
  );
};

export default MyNavbar;
