import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import Cart from './Cart';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery }) => {
  const { state: cartState } = useCart();
  const { state: authState, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <>
      <header className="bg-[#2874f0] text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center">
                <h1 className="text-xl md:text-2xl font-bold">Flipkart</h1>
                <span className="hidden sm:block text-xs italic ml-1">Explore Plus</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 md:mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 pl-12 text-gray-900 bg-white rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2 md:space-x-6">
              {authState.isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-blue-600 transition-colors">
                    <User size={20} />
                    <span className="hidden md:block">{authState.user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Profile
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Orders
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Wishlist
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  <User size={20} />
                  <span className="hidden md:block">Login</span>
                </button>
              )}

              <button className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-blue-600 transition-colors">
                <Heart size={20} />
                <span className="hidden md:block">Wishlist</span>
              </button>

              <button
                onClick={() => setShowCart(true)}
                className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-blue-600 transition-colors relative"
              >
                <ShoppingCart size={20} />
                <span className="hidden md:block">Cart</span>
                {cartState.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ff6161] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartState.totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden bg-blue-700 py-4">
              <div className="space-y-2">
                <button className="block w-full text-left py-2 px-4 hover:bg-blue-600">
                  Electronics
                </button>
                <button className="block w-full text-left py-2 px-4 hover:bg-blue-600">
                  Fashion
                </button>
                <button className="block w-full text-left py-2 px-4 hover:bg-blue-600">
                  Home & Kitchen
                </button>
                <button className="block w-full text-left py-2 px-4 hover:bg-blue-600">
                  Books
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <Cart onClose={() => setShowCart(false)} />
      )}
    </>
  );
};

export default Header;