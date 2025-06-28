import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';
import { products } from './data/products';
import { Product } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
          <CategoryNav 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          <HeroBanner />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} products found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            
            <ProductGrid 
              products={filteredProducts}
              onProductClick={handleProductClick}
            />
          </main>

          <Footer />

          {selectedProduct && (
            <ProductDetails
              product={selectedProduct}
              onClose={handleCloseProductDetails}
            />
          )}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;