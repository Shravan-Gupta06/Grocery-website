import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { Address } from '../../types';
import { MapPin, CreditCard, Truck } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

const CheckoutForm: React.FC = () => {
  const { cartItems, cartTotal, checkout } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState<Address>({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate values
  const subtotal = cartTotal;
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate required fields
    if (!address.fullName) newErrors.fullName = 'Full name is required';
    if (!address.street) newErrors.street = 'Street address is required';
    if (!address.city) newErrors.city = 'City is required';
    if (!address.state) newErrors.state = 'State is required';
    if (!address.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!address.phone) newErrors.phone = 'Phone number is required';
    
    // Simple pattern validations
    if (address.phone && !/^\d{10}$/.test(address.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (address.zipCode && !/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    if (!user) return;
    
    setIsProcessing(true);
    
    // Process the order
    const orderId = checkout(address, paymentMethod, user.id);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/order-confirmation', { state: { orderId } });
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Shipping Information */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <MapPin size={20} className="text-green-600 mr-2" />
            <h2 className="text-xl font-semibold">Shipping Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={address.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="street" className="block text-gray-700 font-medium mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={address.street}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.street ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.street && (
                <p className="text-red-500 text-sm mt-1">{errors.street}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="city" className="block text-gray-700 font-medium mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={address.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="state" className="block text-gray-700 font-medium mb-1">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={address.state}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CreditCard size={20} className="text-green-600 mr-2" />
            <h2 className="text-xl font-semibold">Payment Method</h2>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                className="mr-3 h-5 w-5 text-green-600"
              />
              <div>
                <p className="font-medium">Cash on Delivery</p>
                <p className="text-sm text-gray-500">Pay with cash when your order is delivered</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-gray-800">
                    {item.name} <span className="text-gray-500">x{item.quantity}</span>
                  </p>
                </div>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
              <span>Total</span>
              <span className="text-green-600">{formatPrice(total)}</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full mt-6 py-3 rounded-md flex items-center justify-center transition-colors ${
              isProcessing
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isProcessing ? (
              'Processing Order...'
            ) : (
              <>
                <Truck size={20} className="mr-2" />
                Place Order
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;