
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aether Noise-Cancelling Headphones',
    price: 349.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Experience studio-quality sound with our flagship hybrid active noise-cancelling technology.',
    rating: 4.9,
    reviews: 1240,
    stock: 15
  },
  {
    id: '2',
    name: 'Lumina Smart Watch Pro',
    price: 299.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Stay connected and track your health metrics with precision using the latest Lumina OS.',
    rating: 4.8,
    reviews: 856,
    stock: 22
  },
  {
    id: '3',
    name: 'Onyx Silk Minimalist Tote',
    price: 185.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1584917033904-491a34d2aed1?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted premium leather tote designed for the modern urban professional.',
    rating: 4.7,
    reviews: 420,
    stock: 8
  },
  {
    id: '4',
    name: 'Zenith Organic Essential Kit',
    price: 75.00,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'A curated set of 100% organic essential oils for deep relaxation and focus.',
    rating: 4.9,
    reviews: 310,
    stock: 50
  },
  {
    id: '5',
    name: 'Nordic Oak Coffee Table',
    price: 450.00,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
    description: 'Sustainably sourced solid oak table with a minimalist Scandinavian design aesthetic.',
    rating: 4.6,
    reviews: 150,
    stock: 3
  },
  {
    id: '6',
    name: 'Velvet Cloud Skincare Set',
    price: 120.00,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&w=800&q=80',
    description: 'A complete 5-step hydration system for glowing, radiant skin throughout the day.',
    rating: 5.0,
    reviews: 2100,
    stock: 45
  }
];

export const CATEGORIES: string[] = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Wellness'];
