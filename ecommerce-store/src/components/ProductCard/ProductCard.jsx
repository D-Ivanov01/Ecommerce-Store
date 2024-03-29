import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductRating from '../ProductRating/ProductRating';
import ProductDetailsPopup from '../ProductDetailsPopup/ProductDetailsPopup';
import './ProductCard.css';

const ProductCard = ({ product, updateCartCount }) => {
  // Use React state to manage the rating
  const [rating, setRating] = useState(() => {
    const storedRating = localStorage.getItem(`rating_${product.id}`);
    return storedRating ? parseFloat(storedRating) : 0;
  });

  useEffect(() => {
    // Store the rating in local storage whenever it changes
    localStorage.setItem(`rating_${product.id}`, rating.toString()); // Convert rating to string
  }, [rating, product.id]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddToCart = () => {
    updateCartCount();
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <Card id="product-cart" square>
      <CardMedia 
        id='product-image'
        sx={{ p: '10px' }}
        component="img"
        alt={`${product.brand} ${product.model}`}
        image={product.image}
        onClick={handlePopupOpen} // Open popup when image is clicked
      />
      <CardContent>
        <Typography id='product-title' variant="h6">{product.brand} {product.model}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Price: ${product.price}
        </Typography>
        <ProductRating value={rating} onChange={setRating} />
      </CardContent>
      <div className="add-to-basket">
        <IconButton
          aria-label='add to shopping cart'
          size='medium'
          onClick={handleAddToCart}
        >
          <AddShoppingCartIcon fontSize='small' />
        </IconButton>
      </div>
      {isPopupOpen && <ProductDetailsPopup product={product} onClose={handlePopupClose} onAddToCart={handleAddToCart} />}
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  updateCartCount: PropTypes.func.isRequired,
};

export default ProductCard;
