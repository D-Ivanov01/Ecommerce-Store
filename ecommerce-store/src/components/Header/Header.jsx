import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { filterProductsByCategory } from '../../services/product.service.js';
import ProductCard from './ProductCard/ProductCard.jsx';
import productsData from '../../data/product.json'
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import './Header.css'

const drawerWidth = 250;
const navItems = ['IOS', 'Android', 'UIO'];


const Header =  (props) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filteredProducts = selectedCategory
  ? filterProductsByCategory(selectedCategory, productsData)
  : productsData;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };


  // Handle logo click to reset the filtered data
  const handleLogoClick = () => {
    setSelectedCategory(null);
  };


  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
  <Typography variant="h6" sx={{ my: 2 }}>
    <img
      id="logo-drawer"
      src="src\assets\logo.png"
      alt="logo"
      onClick={() => {
        handleLogoClick();
        setMobileOpen(false); // Close the drawer after clicking the logo
      }}
      style={{ cursor: 'pointer' }}
    />
  </Typography>
  <Divider />
  <List>
    {navItems.map((item) => (
      <ListItem key={item} disablePadding>
        <ListItemButton
          sx={{ textAlign: 'center' }}
          onClick={() => {
            handleCategoryClick(item);
            setMobileOpen(false); // Close the drawer after clicking a category
          }}
        >
          <ListItemText primary={item} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
</Box>

  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar component="nav" sx={{ bgcolor: 'white' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon sx={{ color: 'black' }} />
        </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' },  }}
          >
             <img
              id="logo"
              src="src\assets\logo.png"
              alt="logo"
              onClick={handleLogoClick} // Attach the click handler to the logo
              style={{ cursor: 'pointer' }} // Change cursor to pointer
            />
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
          {navItems.map((item) => (
          <Button
            key={item}
            sx={{ color: 'black' }}
            onClick={() => handleCategoryClick(item)}
          >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Render the filtered products using Grid */}
      <Container sx={{ marginTop: 3 }}>
        <Grid container spacing={2}>
          {filteredProducts.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
  
}

export default Header