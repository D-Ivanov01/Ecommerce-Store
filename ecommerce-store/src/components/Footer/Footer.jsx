import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <Box component="footer" className="footer-container">
      <Typography variant="body2" color="textSecondary" className="footer-links">
        <Link href="/terms">Terms & Conditions</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/contact">Contact Us</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
