import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../hooks/useAuth';
import { getUserOrders } from '../utils/storage';
import { User as UserIcon, Package, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // Get user orders count
  const userOrders = getUserOrders(user.id);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                  <UserIcon size={40} className="text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Orders Placed</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {userOrders.length}
                  </span>
                </div>
                
                <button
                  onClick={logout}
                  className="w-full mt-4 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md transition-colors"
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h3>
                
                {userOrders.length > 0 ? (
                  <div className="space-y-3">
                    {userOrders.slice(0, 3).map(order => (
                      <div key={order.id} className="flex items-center bg-gray-50 p-3 rounded-md">
                        <Package size={20} className="text-green-600 mr-3" />
                        <div className="flex-grow">
                          <p className="text-sm font-medium">
                            Order #{order.id.substring(0, 8).toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                          </p>
                        </div>
                        <span className="text-green-600 font-medium">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    You haven't placed any orders yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;