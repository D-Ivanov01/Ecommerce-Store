import React, { useState } from 'react';
import './ProductSorting.css';
import SideBar from '../SideBar/SideBar';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const ProductSorting = ({ onSortChange }) => {
    const [showSidebar, setShowSidebar] = useState(false);
  
    const handleSortChange = (event) => {
      const selectedSort = event.target.value;
      onSortChange(selectedSort);
    };
  
    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };
  
    return (
      <div className="product-sorting-container">
        {/* Show sorting options when screen width is larger than 599px */}
        <div className="desktop-sorting">
          <label className="sort-label" htmlFor="sort-select">
            Sort by:
          </label>
          <select className="sort-select" onChange={handleSortChange}>
            <option value="alpha-asc">Alphabetical A-Z</option>
            <option value="alpha-desc">Alphabetical Z-A</option>
            <option value="price-asc">Price Ascending</option>
            <option value="price-desc">Price Descending</option>
          </select>
        </div>
  
        {/* Show sidebar toggle button and icon when screen width is 599px or less */}
        <div className="mobile-sorting">
          <button className="sidebar-toggle-button" onClick={toggleSidebar}>
            <KeyboardArrowRightIcon />
          </button>
          <SideBar open={showSidebar} onClose={toggleSidebar}>
            <label className="sort-label" htmlFor="sort-select">
              Sort by:
            </label>
            <select className="sort-select" onChange={handleSortChange}>
              <option value="alpha-asc">Alphabetical A-Z</option>
              <option value="alpha-desc">Alphabetical Z-A</option>
              <option value="price-asc">Price Ascending</option>
              <option value="price-desc">Price Descending</option>
            </select>
          </SideBar>
        </div>
      </div>
    );
  };

export default ProductSorting;
