
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products, getCategories, getProductsByCategory } from "@/data/products";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const categories = getCategories();

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(getProductsByCategory(selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shop-primary to-shop-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopEase</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Your one-stop shop for all your needs.
          </p>
          <Button
            size="lg"
            className="bg-white text-shop-primary hover:bg-gray-100"
            asChild
          >
            <a href="#products">Shop Now</a>
          </Button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="flex overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div 
                key={category}
                className={`min-w-[200px] md:min-w-0 rounded-lg overflow-hidden border transition-all duration-200 hover:shadow-md ${selectedCategory === category ? 'border-shop-primary ring-2 ring-shop-primary ring-opacity-50' : 'border-gray-200'}`}
              >
                <button
                  className="w-full h-full p-6 text-center"
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                >
                  <h3 className="font-medium text-lg">{category}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {getProductsByCategory(category).length} Products
                  </p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {selectedCategory ? `${selectedCategory} Products` : "All Products"}
            </h2>
            {selectedCategory && (
              <Button 
                variant="outline"
                onClick={() => setSelectedCategory(null)}
              >
                Clear Filter
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
