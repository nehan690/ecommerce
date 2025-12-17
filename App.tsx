
import React, { useState, useMemo } from 'react';
import Navigation from './components/Navigation';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import AIShoppingAssistant from './components/AIShoppingAssistant';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, Category } from './types';
import { Sparkles, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'browsing' | 'processing' | 'success'>('browsing');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const handleCheckout = () => {
    setCheckoutStep('processing');
    setIsCartOpen(false);
    setTimeout(() => {
      setCheckoutStep('success');
      setCartItems([]);
    }, 2500);
  };

  return (
    <div className="min-h-screen pb-20">
      <Navigation 
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => alert("Profile management coming soon!")}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold tracking-widest text-xs uppercase mb-4">
              <Sparkles size={16} />
              <span>Curated Collections 2024</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
              Elegance in <br />
              <span className="italic text-indigo-400">every detail.</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-lg leading-relaxed">
              Discover a meticulously crafted selection of essentials designed for the discerning individual. Shop with our AI assistant for a personalized experience.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-colors flex items-center space-x-2">
                <span>Shop New Arrivals</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-sm text-slate-400 font-medium">
            Showing {filteredProducts.length} results
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">No items found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query.</p>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      {/* AI Assistant */}
      <AIShoppingAssistant cartItems={cartItems} />

      {/* Checkout Mock UI */}
      {checkoutStep === 'processing' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/95 backdrop-blur-md">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Securing your order...</h2>
            <p className="text-slate-400">Verifying payment with our premium network.</p>
          </div>
        </div>
      )}

      {checkoutStep === 'success' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white">
          <div className="max-w-md w-full px-6 text-center">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-4xl font-serif text-slate-900 mb-4">A Remarkable Choice.</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Your order #NV-82910 has been placed. You'll receive a confirmation email shortly with your tracking details.
            </p>
            <button 
              onClick={() => setCheckoutStep('browsing')}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-32 border-t border-slate-100 pt-16 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-serif tracking-tight text-slate-900 mb-6">
                NovaMarket<span className="text-indigo-600">.</span>
              </div>
              <p className="text-slate-500 max-w-xs leading-relaxed">
                Elevating everyday life through meticulously curated design and advanced technological integration.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Experience</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Personal Assistant</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Gift Concierge</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Nova Rewards</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Store Locator</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Secure Checkout</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Order Tracking</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Return Policy</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Contact Expert</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 space-y-4 md:space-y-0">
            <p>© 2024 NovaMarket Elite. All rights reserved.</p>
            <div className="flex space-x-6">
              <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-900 cursor-pointer">Accessibility</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
