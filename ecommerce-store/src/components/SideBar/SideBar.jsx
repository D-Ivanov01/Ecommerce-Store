import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './SideBar.css';

const SideBar = ({ children, open, onClose }) => {
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('sidebar-overlay')) {
      onClose();
    }
  };

  return (
    <div>
      {open && <div className="sidebar-overlay" onClick={handleOverlayClick}></div>}
      <div className={`sidebar ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default SideBar;
