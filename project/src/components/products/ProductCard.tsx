import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded">
          {formatPrice(product.price)}/{product.unit}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900">{formatPrice(product.price)}</span>
          
          {isInCart ? (
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleDecreaseQuantity}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="text-gray-700 font-medium w-6 text-center">
                {cartItem.quantity}
              </span>
              <button 
                onClick={handleIncreaseQuantity}
                className="bg-green-100 hover:bg-green-200 text-green-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md flex items-center transition-colors"
            >
              <ShoppingCart size={16} className="mr-1" />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;