import React from 'react';
import "./ProductSorting.css";

const ProductSorting = ({ onSortChange }) => {
  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    onSortChange(selectedSort);
  };

  return (
    <div id="product-sorting">
      <label htmlFor="sort-select">Sort by: </label>
      <select id="sort-select" onChange={handleSortChange}>
        <option value="alpha-asc">Alphabetical A-Z</option>
        <option value="alpha-desc">Alphabetical Z-A</option>
        <option value="price-asc">Price Ascending</option>
        <option value="price-desc">Price Descending</option>
      </select>
    </div>
  );
};

export default ProductSorting;
