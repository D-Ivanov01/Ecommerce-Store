import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header/Header.jsx';
import ProductGrid from './components/ProductGrid/ProductGrid.jsx';
import { getCartCount,} from './services/shoppingCart.services.js';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartCount, setCartCount] = useState(getCartCount());

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCartCountUpdate = () => {
    setCartCount(getCartCount()); // Update the cart count state
  };

  return (
    <div>
      <CssBaseline />
      <Header
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        cartCount={cartCount}
      />
      <ProductGrid
        selectedCategory={selectedCategory}
        updateCartCount={handleCartCountUpdate}
      />
    </div>
  );
};

export default App;
