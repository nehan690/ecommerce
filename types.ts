
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Pending';
  trackingNumber: string;
}

export type Category = 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Beauty' | 'Wellness';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
