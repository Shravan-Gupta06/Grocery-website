import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import { Product } from '../types';
import productsData from '../data/products.json';
import { ShoppingBag, Truck, Clock, ThumbsUp } from 'lucide-react';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Randomly select 4 products as featured
    const randomProducts = [...productsData.products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    
    setFeaturedProducts(randomProducts);
  }, []);

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Fresh Groceries Delivered to Your Doorstep
              </h1>
              <p className="text-lg opacity-90">
                Shop from our wide selection of farm-fresh produce, dairy, meat, and pantry essentials.
                Enjoy convenient and quick delivery.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/products"
                  className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-md font-medium transition-colors inline-block text-center"
                >
                  Shop Now
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-700 text-white hover:bg-green-800 px-6 py-3 rounded-md font-medium transition-colors inline-block text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Fresh vegetables and fruits"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Groco?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fresh Products</h3>
              <p className="text-gray-600">
                We source directly from local farms to ensure the freshest produce for our customers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Free Delivery</h3>
              <p className="text-gray-600">
                Free delivery on orders over $50. We deliver right to your doorstep at your convenience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Delivery</h3>
              <p className="text-gray-600">
                Same-day delivery available for orders placed before 1 PM. Never wait too long.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Satisfaction</h3>
              <p className="text-gray-600">
                Not satisfied with your order? We offer hassle-free returns and replacements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
            <Link to="/products" className="text-green-600 hover:text-green-700 font-medium">
              View All Products →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {productsData.categories.map(category => (
              <Link 
                key={category}
                to={`/products?category=${category}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors capitalize">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Groco for their grocery needs.
            Get started today and enjoy fresh, quality products delivered to your door.
          </p>
          <Link
            to="/products"
            className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-md font-medium transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;