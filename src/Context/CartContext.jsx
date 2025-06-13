import { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);


  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleAddToCart = useCallback((product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const handleQuantityChange = useCallback((itemId, change) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );
  }, []);

  const saveBill = useCallback(() => {
    alert("Bill saved!");
    setCartItems([]);
    localStorage.removeItem('cartItems');  
    closeCart();
  }, [closeCart]);

  const totalBill = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }, [cartItems]);



  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        isCartOpen,
        openCart,
        closeCart,
        saveBill,
        totalBill,
        handleQuantityChange,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
