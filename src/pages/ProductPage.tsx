import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star, ChevronLeft, Plus, Minus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { convertUSDToINR, formatCurrency } from "@/utils/currencyConverter";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4) 
    : [];

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, the product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain aspect-square"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">{product.rating} / 5</span>
            </div>
            
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold mr-4">
                {formatCurrency(product.price, 'USD')}
              </span>
              <span className="text-xl text-gray-600">
                {formatCurrency(convertUSDToINR(product.price), 'INR')}
              </span>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <div className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {product.category}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 font-medium w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-auto space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-shop-primary hover:bg-shop-secondary"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full"
                onClick={() => {
                  addToCart(product, quantity);
                  navigate("/cart");
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
