import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/formatters';
import { ShoppingBag } from 'lucide-react';

const CartSummary: React.FC = () => {
  const { cartItems, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Calculate values
  const subtotal = cartTotal;
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {subtotal > 0 ? formatPrice(shipping) : 'Free'}
          </span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-lg font-bold text-green-600">{formatPrice(total)}</span>
        </div>
      </div>
      
      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
        className={`w-full py-3 rounded-md flex items-center justify-center transition-colors ${
          cartItems.length === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        <ShoppingBag size={20} className="mr-2" />
        {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
      </button>
      
      {cartItems.length === 0 && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Add items to your cart to proceed
        </p>
      )}
    </div>
  );
};

export default CartSummary;