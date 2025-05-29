import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import { Search, Filter } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  categories: string[];
}

const ProductList: React.FC<ProductListProps> = ({ products, categories }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(20);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let results = products;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price
    if (priceRange < 20) {
      results = results.filter(product => product.price <= priceRange);
    }
    
    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, priceRange, products]);

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange(20);
  };

  return (
    <div className="w-full">
      {/* Search and Filter Bar */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <button 
            onClick={toggleFilters}
            className="flex items-center text-gray-700 hover:text-green-600 transition-colors md:ml-4"
          >
            <Filter size={18} className="mr-1" />
            <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        {/* Expandable Filters */}
        {isFilterOpen && (
          <div className="mt-4 border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price: ${priceRange}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;