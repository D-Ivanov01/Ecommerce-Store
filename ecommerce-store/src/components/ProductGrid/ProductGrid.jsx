import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { filterProductsByCategory } from '../../services/product.service.js';
import { increaseCartCount } from '../../services/shoppingCart.services.js';
import { Container } from '@mui/material';
import Alert from '@mui/material/Alert';
import productsData from '../../data/product.json';
import './ProductGrid.css';

const ProductGrid = ({ selectedCategory, updateCartCount, sortOption }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [numProductsToShow, setNumProductsToShow] = useState(20);
  const [numProductsToLoad, setNumProductsToLoad] = useState(20);

  const filteredProducts = selectedCategory
    ? filterProductsByCategory(selectedCategory, productsData)
    : productsData.slice(0, numProductsToShow);
  // Copy the filtered products array and then sort it based on the sortOption
  const sortedProducts = [...filteredProducts];
  if (sortOption === 'alpha-asc') {
    sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
  } else if (sortOption === 'alpha-desc') {
    sortedProducts.sort((a, b) => b.brand.localeCompare(a.brand));
  } else if (sortOption === 'price-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const hasMoreProducts = sortedProducts.length < productsData.length;
  const isLessThanTwenty = sortedProducts.length < 20;

  const handleAddToCart = () => {
    increaseCartCount();
    updateCartCount(); // Call the updateCartCount function from props
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleLoadMore = () => {
    setNumProductsToShow((prevNum) => prevNum + numProductsToLoad);
  };

  return (
    <Container id="product-container">
      {/* Product Counter */}
      <Box id="product-counter" mb={2}>
        {sortedProducts.length} out of {productsData.length} products
      </Box>
      <Grid container spacing={4}>
        {sortedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} updateCartCount={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      <Box id="load-more">
        {hasMoreProducts && !isLessThanTwenty && (
          <Button variant="outlined" color="inherit" onClick={handleLoadMore}>
            Load More
          </Button>
        )}
      </Box>

      {showAlert && (
        <Alert
          id="alert"
          severity="success"
          onClose={() => setShowAlert(false)}
        >
          Item added to cart successfully!
        </Alert>
      )}
    </Container>
  );
};

ProductGrid.propTypes = {
  selectedCategory: PropTypes.string, // Replace with appropriate prop type
  updateCartCount: PropTypes.func.isRequired,
  sortOption: PropTypes.string, // Replace with appropriate prop type
};
export default ProductGrid;
