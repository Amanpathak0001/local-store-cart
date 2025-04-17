
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getCategories } from "@/data/products";

const Header = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const categories = getCategories();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-shop-primary">ShopEase</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-shop-primary">
            Home
          </Link>
          <div className="relative group">
            <button className="text-gray-700 hover:text-shop-primary flex items-center">
              Categories
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 opacity-0 transform scale-95 transition-all duration-100 origin-top-right invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/?category=${category}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="pl-8 pr-4 w-64"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Cart */}
        <Link to="/cart" className="flex items-center space-x-2">
          <div className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-shop-primary">
                {totalItems}
              </Badge>
            )}
          </div>
        </Link>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" className="block text-gray-700">
              Home
            </Link>
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pl-8 pr-4 w-full"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/?category=${category}`}
                className="block text-gray-700"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
