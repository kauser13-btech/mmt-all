// CartContext.js
"use client";
import React, { createContext, useContext, useState } from "react";
import useFetchCartData from "@/hooks/cart/useFetchCartData";
import usePostCartData from "@/hooks/cart/usePostCartData";
import useRemoveCartData from "@/hooks/cart/useRemoveCartData";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [openCart, setOpenCart] = useState(false)
  const fetchCart = useFetchCartData();
  const postCart = usePostCartData();
  const removeCart = useRemoveCartData();
  return (
    <CartContext.Provider value={{ ...fetchCart, ...postCart, ...removeCart, openCart, setOpenCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
