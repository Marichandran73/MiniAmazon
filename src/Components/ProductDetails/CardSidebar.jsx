import "./Static/CSS/CardSidebar.css";
import { MdClose } from "react-icons/md";
import { useCart } from "../../Context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaHouseUser } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const CartSidebar = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    handleAddToCart,
    isCartOpen,
    openCart,
    closeCart,
    saveBill,
    totalBill,
    handleQuantityChange,
    ProductDelete,
  } = useCart();

  const handleAddItem = (itemId) => {
    handleQuantityChange(itemId, 1);
  };

  const handleSubItem = (itemId) => {
    handleQuantityChange(itemId, -1);
  };

  const [userDetail, setUserDetail] = useState(null);

useEffect(() => {
  const fetchUserProfile = async () => {
    const userId = localStorage.getItem("userId");

    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    try {
     fetch(`https://ecommerce-backend-ab16.onrender.com/api/user/userdetails/${userId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
  },
})
.then(res => res.json())
.then(data => setUserDetail(data.user))
    } catch (err) {
      console.error("Error fetching user:", err.message);
    }
  };

  fetchUserProfile();
}, []);





  const GotoSignup = () => {
    navigate("/Signup");
  };

  return (
    <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Your Products</h2>

        <MdClose className="close-icon" onClick={closeCart} />
      </div>
      <div className="top-user-info">
        {userDetail && (
          <>
            <div>
              <FaHouseUser className="user-profile" />
            </div>
            <div className="user-profile-right">
              <p>
                <strong>{userDetail.name}</strong>
              </p>
              <p>{userDetail.email}</p>
            </div>
          </>
        )}
      </div>

      <div className="cart-body">
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is empty.</p>

            <button className="button-signup" onClick={GotoSignup}>
              Signup
            </button>
          </>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.urls} alt={item.name} />
              <div className="bill-total">
                <p>{item.name}</p>
                <div className="sub-bill-total">
                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                  <button
                    className="btn2 incre-btn"
                    onClick={() => handleAddItem(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="btn2 incre-btn"
                    onClick={() => handleSubItem(item.id)}
                  >
                    -
                  </button>
                  <button className="cart-dlt-btn"
                   onClick={()=> ProductDelete(item.id)}>
                    <MdDeleteSweep />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <p>Total: ₹{totalBill}</p>
        <div className="bill-buttons">
          <button onClick={saveBill} className="save">
            Save Bill
          </button>
          <button onClick={closeCart} className="close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
