// import { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';
// import { useCart } from './CartContext';
// import axios from 'axios';

// const ProfileContext = createContext();

// export const UserProfile = () => useContext(ProfileContext);

// export const UserContext = ({ children }) => {
//   const {
//     cartItems,
//     handleAddToCart,
//     isCartOpen,
//     openCart,
//     closeCart,
//     saveBill,
//     totalBill,
//     handleQuantityChange
//   } = useCart();

//   const SaveCartBackend = useCallback(async (userId) => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/user/Cart', {
//         userId,
//         cartItems
//       });
//       console.log("Cart saved successfully:", response.data);
//     } catch (error) {
//       console.error("Error saving cart:", error);
//     }
//   }, [cartItems]);

//   return (
//     <ProfileContext.Provider value={{ SaveCartBackend }}>
//       {children}
//     </ProfileContext.Provider>
//   );
// };
