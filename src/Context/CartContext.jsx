import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";




const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  
  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);
  
  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);
 

  
  useEffect(() => {
    const fetchUserCart = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${userId}`
        );
        if (response.ok) {
          const items = await response.json();
          console.log("User Cart Items:", items);
          setCartItems(items);
        } else {
          console.warn("Cart not found");
        }
      } catch (err) {
        console.error("Error fetching user cart:", err);
      }
    };

    fetchUserCart();
  }, []);


  // ADD TO CART FUNCTIONS 

const handleAddToCart = useCallback(async (product) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("Please login to add items to your cart.");
    return;
  }

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

  try {
    await fetch("http://localhost:3000/api/user/Cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        item: { ...product, quantity: 1 },
      }),
    });
  } catch (err) {
    console.error("Failed to sync cart with backend:", err);
  }
}, []);


// delete function  

  const ProductDelete = useCallback(async (itemId) => {
  setCartItems((prevCartItems) =>
    prevCartItems.filter((item) => item.id !== itemId)
  );

  try {
    const userId = localStorage.getItem("userId");

    await fetch("http://localhost:3000/api/user/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, itemId }),
    });
  } catch (err) {
    console.error("Error deleting item from backend:", err);
  }
}, []);

// change the quantity 

 const handleQuantityChange = useCallback(async (itemId, change) => {
  const userId = localStorage.getItem("userId");

  setCartItems((prevCart) => {
    return prevCart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity + change, 1) }
        : item
    );
  });

  try {
    await fetch("http://localhost:3000/api/user/UpdateQuantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        itemId,
        change, // +1 or -1
      }),
    });
  } catch (error) {
    console.error("Failed to update quantity in backend:", error);
  }
}, []);

  const clearCart = useCallback(() => {
  setCartItems([]);
  localStorage.removeItem("cartItems");
}, []);


  // const saveBill = useCallback(() => {
  //   alert("Bill saved!");
  //   setCartItems([]);
  //   localStorage.removeItem("cartItems");
  //   closeCart();
  // }, [closeCart]);

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
        // saveBill,
        totalBill,
        handleQuantityChange,
        ProductDelete,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
