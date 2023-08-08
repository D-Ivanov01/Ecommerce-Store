import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { filterProductsByCategory } from '../../services/product.service.js';
import { increaseCartCount } from '../../services/shoppingCart.services.js';
import { Container } from '@mui/material';
import Alert from '@mui/material/Alert';
import productsData from '../../data/product.json'
import { getCartCount } from '../../services/shoppingCart.services.js';

const ProductGrid = ({ selectedCategory, updateCartCount}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [numProductsToShow, setNumProductsToShow] = useState(20);
  const [numProductsToLoad, setNumProductsToLoad] = useState(20);

  const filteredProducts = selectedCategory
    ? filterProductsByCategory(selectedCategory, productsData)
    : productsData.slice(0, numProductsToShow);

    const handleAddToCart = () => {
        increaseCartCount();
        updateCartCount(); // Call the updateCartCount function from props
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      };

  const handleLoadMore = () => {
    setNumProductsToShow((prevNum) => prevNum + numProductsToLoad);
  };

  const hasMoreProducts = filteredProducts.length < productsData.length;
  const isLessThanTwenty = filteredProducts.length < 20;

  return (
    <Container id="product-container">
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard
            product={product}
            updateCartCount={handleAddToCart}
                />
          </Grid>
        ))}
      </Grid>
      {hasMoreProducts && !isLessThanTwenty && (
        <Button variant="outlined" color="inherit" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
      {showAlert && (
        <Alert
          id='alert'
          severity="success"
          onClose={() => setShowAlert(false)}
        >
          Item added to cart successfully!
        </Alert>
      )}
    </Container>
  );
};

export default ProductGrid;
