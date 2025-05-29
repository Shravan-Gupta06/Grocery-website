import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Checkout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Redirect to cart if cart is empty
  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        <CheckoutForm />
      </div>
    </Layout>
  );
};

export default Checkout;