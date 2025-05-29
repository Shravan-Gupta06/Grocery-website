import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-green-400">Gro</span>
              <span className="text-white">co</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your one-stop solution for fresh groceries delivered to your doorstep.
              We bring the best quality products directly from farms to your table.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-green-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-green-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-green-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white transition-colors">
                  My Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white transition-colors">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=fruits" className="text-gray-300 hover:text-white transition-colors">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/products?category=vegetables" className="text-gray-300 hover:text-white transition-colors">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=dairy" className="text-gray-300 hover:text-white transition-colors">
                  Dairy
                </Link>
              </li>
              <li>
                <Link to="/products?category=bakery" className="text-gray-300 hover:text-white transition-colors">
                  Bakery
                </Link>
              </li>
              <li>
                <Link to="/products?category=meat" className="text-gray-300 hover:text-white transition-colors">
                  Meat & Poultry
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-green-400" />
                <span>123 Grocery Lane, Fresh City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-green-400" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-green-400" />
                <span>support@groco.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-6 text-center text-gray-300">
          <p>© 2025 Groco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;