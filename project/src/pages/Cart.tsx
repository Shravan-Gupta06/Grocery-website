import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';
import { ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const { cartItems, clearCartItems } = useCart();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                  <button
                    onClick={clearCartItems}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors inline-block"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;