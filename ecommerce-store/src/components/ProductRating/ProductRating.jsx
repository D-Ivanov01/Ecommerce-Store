import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const ProductRating = ({ value, onChange, readOnly }) => {
  return (
    <Box>
      <Rating
        name="simple-controlled"
        value={value}
        readOnly={readOnly} // Set readOnly based on the prop
        onChange={(event, newValue) => {
          if (!readOnly) {
            onChange(newValue); // Call the parent's setter function to update the rating
          }
        }}
      />
    </Box>
  );
};

export default ProductRating;
