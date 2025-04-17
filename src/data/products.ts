
import { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Experience crystal clear sound with our premium wireless headphones. Features noise cancellation and 20-hour battery life.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 2,
    name: "Smart Fitness Tracker",
    description: "Monitor your health and fitness with our advanced tracker. Includes heart rate monitoring, sleep tracking, and workout analytics.",
    price: 89.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80",
    featured: true,
    inStock: true,
    rating: 4.5
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    description: "Work comfortably with our ergonomic office chair. Designed to support your back during long work hours.",
    price: 249.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    featured: false,
    inStock: true,
    rating: 4.3
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks cold for 24 hours or hot for 12 hours with our vacuum insulated water bottle.",
    price: 29.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: 5,
    name: "Professional Digital Camera",
    description: "Capture stunning photos and videos with our professional-grade digital camera. Includes multiple lenses and accessories.",
    price: 1299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80",
    featured: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    description: "Take your music anywhere with our waterproof, portable Bluetooth speaker. Offers 12 hours of playback.",
    price: 79.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2936&q=80",
    featured: false,
    inStock: true,
    rating: 4.4
  },
  {
    id: 7,
    name: "Organic Cotton T-Shirt",
    description: "Stay comfortable with our 100% organic cotton t-shirt. Available in multiple colors.",
    price: 24.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2880&q=80",
    featured: false,
    inStock: true,
    rating: 4.2
  },
  {
    id: 8,
    name: "Smart Home Security System",
    description: "Protect your home with our comprehensive security system. Includes cameras, sensors, and mobile app control.",
    price: 349.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1558002038-bb0401b9e6b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80",
    featured: true,
    inStock: true,
    rating: 4.6
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getCategories = (): string[] => {
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
};
