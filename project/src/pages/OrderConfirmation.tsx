import React, { useEffect, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Order } from '../types';
import { getOrders } from '../utils/storage';
import { formatPrice, formatDate } from '../utils/formatters';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    const { state } = location;
    if (state && state.orderId) {
      const orders = getOrders();
      const foundOrder = orders.find(o => o.id === state.orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [location]);
  
  // Redirect if no order information
  if (!location.state || !location.state.orderId) {
    return <Navigate to="/" />;
  }
  
  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading order details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your order. We've received your request and will process it shortly.
            </p>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <span className="text-gray-500">
                Order #: <span className="font-medium">{order.id.substring(0, 8).toUpperCase()}</span>
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Shipping Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">{order.address.fullName}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state} {order.address.zipCode}</p>
                  <p>Phone: {order.address.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p>Order Date: {formatDate(order.date)}</p>
                  <p>Payment Method: Cash on Delivery</p>
                  <p>Total Amount: {formatPrice(order.total)}</p>
                  <p>Status: <span className="text-orange-500 font-medium capitalize">{order.status}</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Items Ordered</h2>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center">
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-gray-800 font-medium">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {formatPrice(item.price)} x {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <Link
              to="/orders"
              className="flex items-center text-green-600 hover:text-green-700 transition-colors"
            >
              <ShoppingBag size={18} className="mr-1" />
              <span>View All Orders</span>
            </Link>
            
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors flex items-center"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;