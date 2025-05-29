import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, Address } from '../types';
import { getCart, saveCart, clearCart, saveOrder } from '../utils/storage';
import { generateId } from '../utils/formatters';

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCartItems: () => void;
  checkout: (address: Address, paymentMethod: string, userId: string) => string;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCartItems: () => {},
  checkout: () => '',
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    // Initialize cart from localStorage
    const storedCart = getCart();
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    // Update cart count and total when cart items change
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setCartCount(count);
    setCartTotal(total);
    
    // Save to localStorage
    saveCart(cartItems);
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1): void => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (productId: number, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number): void => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCartItems = (): void => {
    setCartItems([]);
    clearCart();
  };

  const checkout = (address: Address, paymentMethod: string, userId: string): string => {
    if (cartItems.length === 0) return '';
    
    const order: Order = {
      id: generateId(),
      userId,
      items: [...cartItems],
      total: cartTotal,
      address,
      paymentMethod,
      status: 'processing',
      date: new Date().toISOString()
    };
    
    saveOrder(order);
    clearCartItems();
    
    return order.id;
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        cartCount, 
        cartTotal, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCartItems,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};