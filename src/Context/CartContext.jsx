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

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  }, []);

  // Persist cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);



  // Fetch user cart on mount
  useEffect(() => {
  const fetchUserCart = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    try {
      const response = await fetch(
        `https://ecommerce-backend-ab16.onrender.com/api/user/cart/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.warn("Cart not found", response.status);
        setCartItems([]);
        return;
      }

      const data = await response.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Error fetching user cart:", err);
    }
  };

  fetchUserCart();
}, []);


  // Add to cart
  const handleAddToCart = useCallback(async (product) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("Please login to add items to your cart.");
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    try {
      await fetch("https://ecommerce-backend-ab16.onrender.com/api/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, item: { ...product, quantity: 1 } }),
      });
    } catch (err) {
      console.error("Failed to sync cart with backend:", err);
    }
  }, []);

  // Delete item
const ProductDelete = useCallback(async (itemId) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Optimistic UI update
  setCartItems((prev) => prev.filter((item) => item.id !== itemId));

  try {
    await fetch(`https://ecommerce-backend-ab16.onrender.com/api/user/cart/delete?userId=${userId}&itemId=${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error("Error deleting item:", err);
  }
}, []);


  // Update quantity
  const handleQuantityChange = useCallback(async (itemId, change) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );

    try {
      const response = await fetch(
        "https://ecommerce-backend-ab16.onrender.com/api/user/cart/update-quantity",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, itemId, change }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update quantity on server");
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  }, []);

  const totalBill = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        isCartOpen,
        openCart,
        closeCart,
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
