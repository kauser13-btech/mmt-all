"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mmt_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mmt_cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1, size = 'M', color = null) => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      image: product.image || product.image_urls?.[0]?.url,
      quantity,
      size,
      color: color || product.color,
      type: product.type,
      slug: product.slug,
    };

    setCart(prevCart => {
      // Check if item with same id, size, and color already exists
      const existingItemIndex = prevCart.findIndex(
        item => item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        toast.success(`Updated quantity in cart`);
        return updatedCart;
      } else {
        // Add new item
        toast.success(`${product.title} added to cart`);
        return [...prevCart, cartItem];
      }
    });

    setIsCartOpen(true);
  };

  // Remove item from cart
  const removeFromCart = (itemId, size, color) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(
        item => !(item.id === itemId && item.size === size && item.color === color)
      );
      toast.info('Item removed from cart');
      return updatedCart;
    });
  };

  // Update item quantity
  const updateQuantity = (itemId, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, size, color);
      return;
    }

    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === itemId && item.size === size && item.color === color) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return updatedCart;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast.info('Cart cleared');
  };

  // Calculate totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
