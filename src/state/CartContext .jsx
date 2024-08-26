import React, { createContext, useState, useEffect } from "react";

// Create the context
export const CartContext = createContext();

// CartContext provider component
export const CartProvider = ({ children }) => {
  // Initial state: Try to get cart items from local storage, or start with an empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Function to add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If item exists, increase its quantity
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Otherwise, add the item to the cart
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemId);

      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter((item) => item.id !== itemId);
      }
    });
  };

  // Save cartItems to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
