import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const ProductRating = ()=> {
  const [value, setValue] = React.useState(0);

  return (
    <Box>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};

export default ProductRating;