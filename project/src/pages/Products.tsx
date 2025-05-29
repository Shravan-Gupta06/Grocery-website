import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductList from '../components/products/ProductList';
import { Product } from '../types';
import productsData from '../data/products.json';

const Products: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>(productsData.products);
  const [categories] = useState<string[]>(productsData.categories);
  
  useEffect(() => {
    // Check for category in URL query params
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      // Filter products by category
      const filteredProducts = productsData.products.filter(
        product => product.category === categoryParam
      );
      setProducts(filteredProducts);
    } else {
      // Show all products
      setProducts(productsData.products);
    }
  }, [location.search]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
        <ProductList products={products} categories={categories} />
      </div>
    </Layout>
  );
};

export default Products;