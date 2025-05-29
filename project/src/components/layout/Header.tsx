import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-green-400 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white flex items-center">
            <span className="text-green-800">Gro</span>
            <span className="text-white">co</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-white hover:text-green-800 transition-colors ${location.pathname === '/' ? 'font-semibold' : ''}`}>
              Home
            </Link>
            <Link to="/products" className={`text-white hover:text-green-800 transition-colors ${location.pathname === '/products' ? 'font-semibold' : ''}`}>
              Products
            </Link>
            {isAuthenticated && (
              <Link to="/orders" className={`text-white hover:text-green-800 transition-colors ${location.pathname === '/orders' ? 'font-semibold' : ''}`}>
                My Orders
              </Link>
            )}
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="text-white hover:text-green-800 transition-colors relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-white hover:text-green-800 transition-colors flex items-center">
                  <User size={20} className="mr-1" />
                  <span>{user?.name.split(' ')[0]}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-white hover:text-green-800 transition-colors flex items-center"
                >
                  <LogOut size={20} className="mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white hover:text-green-800 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-md transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="text-white hover:text-green-800 transition-colors relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-md shadow-lg p-4 absolute left-4 right-4 z-50">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`text-green-800 hover:text-green-600 transition-colors ${location.pathname === '/' ? 'font-semibold' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`text-green-800 hover:text-green-600 transition-colors ${location.pathname === '/products' ? 'font-semibold' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/orders" 
                  className={`text-green-800 hover:text-green-600 transition-colors ${location.pathname === '/orders' ? 'font-semibold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
              )}
              
              <div className="border-t border-gray-200 my-2"></div>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="text-green-800 hover:text-green-600 transition-colors flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-2" />
                    <span>My Profile</span>
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-600 hover:text-red-800 transition-colors flex items-center"
                  >
                    <LogOut size={18} className="mr-2" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-green-800 hover:text-green-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md transition-colors inline-block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;