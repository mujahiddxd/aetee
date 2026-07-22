"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('aetee_cart');
    if (savedCart) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('aetee_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const generateCartItemId = (product, size, addons) => {
    const addonsStr = addons ? addons.sort().join('_') : '';
    return `${product.id}-${size || 'default'}-${addonsStr}`;
  };

  const addToCart = ({ product, selectedSize, selectedAddons, totalPrice }) => {
    const cartItemId = generateCartItemId(product, selectedSize, selectedAddons);

    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
        return newItems;
      } else {
        // New item
        return [...prev, {
          cartItemId,
          product,
          selectedSize,
          selectedAddons,
          price: totalPrice,
          quantity: 1
        }];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoaded
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
