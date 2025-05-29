import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../hooks/useCart';
import { Trash, Plus, Minus } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center border-b border-gray-200 py-4 last:border-0">
      <div className="w-20 h-20 rounded-md overflow-hidden mr-4 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-gray-800 font-medium">{item.name}</h3>
        <p className="text-gray-500 text-sm">{formatPrice(item.price)} / {item.unit}</p>
      </div>
      
      <div className="flex items-center space-x-2 mr-4">
        <button 
          onClick={handleDecreaseQuantity}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="text-gray-700 font-medium w-8 text-center">
          {item.quantity}
        </span>
        <button 
          onClick={handleIncreaseQuantity}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="w-24 text-right mr-4">
        <span className="font-medium text-gray-900">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>
      
      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 transition-colors"
        aria-label="Remove item"
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default CartItem;