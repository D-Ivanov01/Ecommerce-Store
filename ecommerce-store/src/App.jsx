import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header/Header.jsx';
import ProductGrid from './components/ProductGrid/ProductGrid.jsx';
import { getCartCount } from './services/shoppingCart.services.js';
import ProductSorting from './components/ProductSorting/ProductSorting';
import ProductFiltering from './components/ProductFiltering/ProductFiltering'; // Import the new component
import { Container, Grid } from '@mui/material';
import Footer from './components/Footer/Footer.jsx';
import './App.css'

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartCount, setCartCount] = useState(getCartCount());
  const [sortOption, setSortOption] = useState('alpha-asc'); // Default sorting option
  const [filters, setFilters] = useState({}); // State to store filters
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCartCountUpdate = () => {
    setCartCount(getCartCount());
  };

  const handleSortChange = (selectedSort) => {
    setSortOption(selectedSort);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id = 'app-bg'>
      <Header
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        cartCount={cartCount}
      />
      <Container className='custom-container'>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            {/* Include the ProductFiltering component */}
            {screenWidth > 599 && <ProductFiltering onFilterChange={handleFilterChange} />}
          </Grid>
          <Grid item xs={9}>
            <ProductSorting onSortChange={handleSortChange} />
            <ProductGrid
              selectedCategory={selectedCategory}
              updateCartCount={handleCartCountUpdate}
              sortOption={sortOption}
              filters={filters} // Pass the filters to ProductGrid
            />
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </div>
  );
};

export default App;
