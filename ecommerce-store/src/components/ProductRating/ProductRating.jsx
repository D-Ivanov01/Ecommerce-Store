import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const ProductRating = ({ value, onChange }) => {
  return (
    <Box>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue); // Call the parent's setter function to update the rating
        }}
      />
    </Box>
  );
};

export default ProductRating;
