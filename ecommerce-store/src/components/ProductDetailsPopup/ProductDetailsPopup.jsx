import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductRating from '../ProductRating/ProductRating';
import './ProductDetailsPopup.css';

const ProductDetailsPopup = ({ product, onClose, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth id='product-popUp'>
      <DialogContent className="dialog-content">
        <IconButton aria-label="close" id="close-button" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className="product-title">
          {product.brand} {product.model}
        </Typography>
        <img src={product.image} alt={`${product.brand} ${product.model}`} className="product-image" />
        <div className="product-details">
        <Typography variant="subtitle1"><strong>Price: $</strong>{product.price}</Typography>
          <Typography variant="body2"> <strong>Screen Size:</strong> {product.screenSize}</Typography>
          <Typography variant="body2"> <strong>Display:</strong> {product.display}</Typography>
          <Typography variant="body2"> <strong>Storage:</strong> {product.storage}</Typography>
          <Typography variant="body2"> <strong>Camera:</strong> {product.camera}</Typography>
          <Typography variant="body2"> <strong>Operating System:</strong> {product.operatingSystem}</Typography>
          <Typography variant="body2"> <strong>Battery:</strong> {product.battery}</Typography>
          <Typography variant="body2"> <strong>Color:</strong> {product.color}</Typography>
          <ProductRating value={localStorage.getItem(`rating_${product.id}`)} readOnly={true} />
        </div>
        <div className="add-to-cart-button">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Add to Shopping Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

ProductDetailsPopup.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductDetailsPopup;
