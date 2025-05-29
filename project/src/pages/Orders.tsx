import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Order } from '../types';
import { getUserOrders } from '../utils/storage';
import { useAuth } from '../hooks/useAuth';
import { formatPrice, formatDate } from '../utils/formatters';
import { Package, ArrowRight, ShoppingBag } from 'lucide-react';

const Orders: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    if (user) {
      const userOrders = getUserOrders(user.id);
      // Sort orders by date (newest first)
      userOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setOrders(userOrders);
    }
  }, [user]);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
        
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order #: <span className="font-medium">{order.id.substring(0, 8).toUpperCase()}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Placed on: {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium capitalize">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-4 mb-4">
                    {order.items.slice(0, 3).map(item => (
                      <div key={item.id} className="flex items-center">
                        <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-gray-800 font-medium text-sm">{item.name}</h3>
                          <p className="text-gray-500 text-xs">
                            {formatPrice(item.price)} x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                    
                    {order.items.length > 3 && (
                      <p className="text-sm text-gray-500">
                        + {order.items.length - 3} more items
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-gray-700 font-medium">
                        Total: <span className="text-green-600">{formatPrice(order.total)}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Paid via: {order.paymentMethod === 'cash' ? 'Cash on Delivery' : order.paymentMethod}
                      </p>
                    </div>
                    <Link
                      to={`/order/${order.id}`}
                      className="mt-3 sm:mt-0 text-green-600 hover:text-green-700 transition-colors flex items-center text-sm"
                    >
                      <span>View details</span>
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No orders yet</h2>
            <p className="text-gray-500 mb-8">
              You haven't placed any orders yet. Start shopping to place your first order!
            </p>
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors inline-block"
            >
              <ShoppingBag size={18} className="inline-block mr-1" />
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;