import './Static/CSS/CardSidebar.css';
import { MdClose } from 'react-icons/md';

const CartSidebar = ({ isOpen, closeCart, cartItems ,saveBill, totalBill}) => {

    
  return (


    
    <>
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Your Products</h2>
        <MdClose className="close-icon" onClick={closeCart} />
      </div>
      <div className="cart-body">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={index}>

              <img src={item.urls} alt={item.name} />
              
                <div className="bill-total">
                <p>{item.name}</p>
                <p>₹{item.price} × {item.quantity} </p> 

                 </div>
              
              
           
            </div>

          ))
        )}
      </div>
      <div className="cart-footer">
        <p>Total: &#8377;{totalBill}</p>
       <div className="bill-buttons">
        

            <button onClick={saveBill} className="save">Save Bill</button>
            <button onClick={closeCart} className="close">Close</button>
      </div>

              </div>
    </div>
    
    </>
  );
};

export default CartSidebar;
