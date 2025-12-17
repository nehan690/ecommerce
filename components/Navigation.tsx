
import React from 'react';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';

interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
  onSearchChange: (query: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ cartCount, onCartClick, onProfileClick, onSearchChange }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <button className="p-2 lg:hidden text-gray-500 hover:text-black">
              <Menu size={24} />
            </button>
            <div className="text-2xl font-serif tracking-tight text-gray-900 cursor-pointer">
              NovaMarket<span className="text-indigo-600">.</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search premium collections..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <button 
              onClick={onProfileClick}
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <User size={22} />
            </button>
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
