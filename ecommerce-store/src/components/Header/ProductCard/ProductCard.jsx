import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'; // Import CardMedia for displaying images
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Card id="product-card" square>
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
        <IconButton aria-label='add to shopping cart' size='medium'>
          <AddShoppingCartIcon  fontSize='small'/>
        </IconButton>
      </div>
    </Card>
  );
};

export default ProductCard;
