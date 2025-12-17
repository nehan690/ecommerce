
import React from 'react';
import { Product } from '../types';
import { Star, PlusCircle } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="aspect-[4/5] overflow-hidden bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <button 
              onClick={() => onAddToCart(product)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-indigo-600 hover:text-white"
            >
              <PlusCircle size={20} />
            </button>
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">{product.category}</span>
              <div className="flex items-center text-xs text-yellow-500 font-medium">
                <Star size={14} className="fill-current mr-1" />
                {product.rating}
              </div>
            </div>
            <h3 className="text-gray-900 font-semibold mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-gray-500 text-xs mb-4 line-clamp-2 h-8">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <span className="text-[10px] text-gray-400 font-medium">{product.reviews} reviews</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
