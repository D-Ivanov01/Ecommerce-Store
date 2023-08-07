import React from 'react';
import PropTypes from 'prop-types'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { increaseCartCount } from '../../../services/shoppingCart.services';
import './ProductCard.css';


const ProductCard = ({ product , cartCount, updateCartCount}) => {

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
