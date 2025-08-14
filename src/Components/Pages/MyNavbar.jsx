import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./NavbarStyles.css";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import logo1 from "../assets/images/Shop-Logo.jpg";
import axios from "axios";

import { useCart } from "../../Context/CartContext";

const MyNavbar = ({ search, num, onCartClick }) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleAuthButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("cartItems");
      setLoggedIn(false);

      if (typeof clearCart === "function") {
        clearCart();
      }

      navigate("/");
    } else {
      navigate("/Signup");
    }
  };



  const OnUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/userProfile");
    } else {
      navigate("/Signup");
    }
  };
  const {
    cartItems,
    handleAddToCart,
    isCartOpen,
    openCart,
    closeCart,
    // saveBill,
    totalBill,
    handleQuantityChange,
    clearCart,
  } = useCart();

  return (
    <div className="navbar">
      <div className="location">
        <div className="logo">
          <img src={logo1} alt="Company Logo" />
        </div>
        <h2>StyleMart</h2>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => search(e.target.value)}
        />
        <button>
          <FaSearch />
        </button>
      </div>

      <div className="right-menu">
        <Button variant="danger" onClick={handleAuthButtonClick}>
          {loggedIn ? "Logout" : "Login"}
        </Button>
        <div className="menu-item">
          <span className="small-text">Hello, Sign in</span>
          <span className="bold-text">Account & Lists</span>
        </div>
        <div className="menu-item">
          <span className="small-text">Returns</span>
          <span className="bold-text">& Orders</span>
        </div>
      </div>

      <div className=" cart-icon">
        <div className="cart-sep">
          <svg
            onClick={OnUser}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 18 18"
          >
            <path
              fill="#941a28"
              d="M0,18V15.75c0-2.476,4.05-4.5,9-4.5s9,2.025,9,4.5V18ZM4.5,4.5A4.5,4.5,0,1,1,9,9,4.5,4.5,0,0,1,4.5,4.5Z"
            ></path>
          </svg>

          <FaCartShopping onClick={onCartClick} />
          <h6 className="head-count">{num}</h6>
        </div>
      </div>
    </div>
  );
};

export default MyNavbar;
