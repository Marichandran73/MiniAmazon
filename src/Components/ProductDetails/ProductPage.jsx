import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Pages/MyNavbar";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import CartSidebar from "./CardSidebar";
import Static2 from "../Products/Static2.jsx";

import { useCart } from "../../Context/CartContext";

import "../Pages/Header.css";
import "./Static/CSS/ProCard.css";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const {
    cartItems,
    handleAddToCart,
    isCartOpen,
    openCart,
    closeCart,
    saveBill,
    totalBill,
    handleQuantityChange,
  } = useCart();

  const selectedItem = Static2.flatMap((section) => section.images || []).find(
    (item) => item.id === id
  );

  if (!selectedItem) return <div>Product not found.</div>;

  const handleClick = (val) => {
    if (val.id) {
      navigate(`/SubProduct/${val.id}`);
    } else {
      alert("Product ID not found");
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <div className="Nav_Section">
        <Navbar
          search={setSearch}
          num={cartItems.reduce((a, b) => a + b.quantity, 0)}
          onCartClick={openCart}
        />
        <Header />
      </div>

      <div className="selected-item-container">
        <div className="product-section">
          <h3>Available Products</h3>
          <div className="head-card">
            {selectedItem.products
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.urls}
                    alt={product.name}
                    onClick={() => handleClick(product)}
                  />

                  <h4 onClick={() => handleClick(product)}>{product.name}</h4>
                  <p>
                    Price: ₹{product.price} {product.offer}
                  </p>
                  <p>
                    MRP: <del>₹{product.mrp}</del>
                  </p>
                  <p>{product.delivery}</p>
                  <p>{product.services}</p>

                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        closeCart={closeCart}
        cartItems={cartItems}
        saveBill={saveBill}
        totalBill={calculateTotal(cartItems)}
        onQuantityChange={handleQuantityChange}
      />

      <Footer />
    </>
  );
};

export default ProductPage;
