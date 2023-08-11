import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header/Header.jsx';
import ProductGrid from './components/ProductGrid/ProductGrid.jsx';
import { getCartCount } from './services/shoppingCart.services.js';
import ProductSorting from './components/ProductSorting/ProductSorting';
import { Container } from '@mui/material';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartCount, setCartCount] = useState(getCartCount());
  const [sortOption, setSortOption] = useState('alpha-asc'); // Default sorting option

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCartCountUpdate = () => {
    setCartCount(getCartCount());
  };

  const handleSortChange = (selectedSort) => {
    setSortOption(selectedSort);
  };

  return (
    <div>
      <Header
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        cartCount={cartCount}
      />
      <Container>
        <ProductSorting onSortChange={handleSortChange} />
      <ProductGrid
        selectedCategory={selectedCategory}
        updateCartCount={handleCartCountUpdate}
        sortOption={sortOption} // Pass the sorting option to ProductGrid
      />
      </Container>
      
    </div>
  );
};

export default App;
