import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.brand} {product.model}</Typography>
        <Typography variant="body2">
          Operating System: {product.operatingSystem}
        </Typography>
        {/* ... (other product details) */}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
