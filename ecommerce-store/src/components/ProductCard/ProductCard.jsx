import {React, useEffect, useState }from 'react';
import PropTypes from 'prop-types'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { increaseCartCount } from '../../services/shoppingCart.services';
import ProductRating from '../ProductRating/ProductRating';
import './ProductCard.css';


const ProductCard = ({ product , updateCartCount}) => {
  const [rating, setRating] = useState(() => {
    // Get the stored rating from local storage or set it to 0 if not available
    const storedRating = localStorage.getItem(`rating_${product.id}`);
    return storedRating ? parseFloat(storedRating) : 0;
  });

  useEffect(() => {
    // Store the rating in local storage whenever it changes
    localStorage.setItem(`rating_${product.id}`, rating);
  }, [rating, product.id]);

  const handleAddToCart = () => {
    increaseCartCount();
    updateCartCount(); // Notify the parent component of the cart count update
  };

  return (
    <Card id="product-cart" square>
      <CardMedia 
      id='product-image '
        component="img"
        alt={`${product.brand} ${product.model}`}
        image={product.image} // Use the image URL from the product data
      />
      <CardContent>
        <Typography variant="h6">{product.brand} {product.model}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Price: ${product.price} {/* Display the price with two decimal places */}
        </Typography>
        <ProductRating value={rating} onChange={setRating} />
      </CardContent>
      <div className="add-to-basket">
        <IconButton aria-label='add to shopping cart' size='medium' onClick={handleAddToCart}>
          <AddShoppingCartIcon  fontSize='small'/>
        </IconButton>
      </div>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  cartCount: PropTypes.number.isRequired,
  updateCartCount: PropTypes.func.isRequired,
};
export default ProductCard;
