import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, Slider, FormControlLabel, FormGroup, Typography, Button, Paper } from '@mui/material';
import './ProductFiltering.css'

const ProductFiltering = ({ onFilterChange }) => {
  const [colorFilters, setColorFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleColorChange = (event) => {
    const selectedColor = event.target.name;
    if (colorFilters.includes(selectedColor)) {
      setColorFilters(colorFilters.filter(color => color !== selectedColor));
    } else {
      setColorFilters([...colorFilters, selectedColor]);
    }
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const applyFilters = () => {
    const filters = {
      colors: colorFilters,
      priceRange: priceRange,
    };
    onFilterChange(filters);
  };

  const colorOptions = [
    'Black', 'White', 'Gray', 'Blue', 'Green',
    'Gold', 'Red' ,'Pink', 'Purple', 'Dark Green'
  ];

  return (
    <Box id="product-filtering" p={2}>
      <Paper id='filter-box'>
        <Typography variant="h4" className='filtering-category'>Filter By:</Typography>
        <FormGroup>
          {/* Color Filtering */}
          <Typography variant='h6' className='filtering-category'>Color:</Typography>
          {colorOptions.map((color) => (
            <FormControlLabel
              key={color}
              control={
                <Checkbox
                  checked={colorFilters.includes(color)}
                  onChange={handleColorChange}
                  name={color}
                />
              }
              label={
                <Typography variant="body2" id="filtering-label">
                  {color}
                </Typography>
              }
            />
          ))}
          {/* Price Range Filtering */}
          <Typography variant='h6' className='filtering-category'>Price:</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={2500}
          />
          <Typography className='filtering-category'>Min: ${priceRange[0]} - Max: ${priceRange[1]}</Typography>
          {/* Apply Button */}
          <Button variant="contained" color="primary" onClick={applyFilters} id='filtering-button'>
            Apply Filters
          </Button>
        </FormGroup>
      </Paper>
    </Box>
  );
};

ProductFiltering.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default ProductFiltering;
