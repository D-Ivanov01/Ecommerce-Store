import * as React from 'react';
import PropTypes from 'prop-types';
import { useState} from 'react';
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
import ProductCard from '../ProductCard/ProductCard.jsx';
import productsData from '../../data/product.json'
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import './Header.css'
import { getCartCount } from '../../services/shoppingCart.services.js';
import { increaseCartCount } from '../../services/shoppingCart.services.js';
import Alert from '@mui/material/Alert';


const drawerWidth = 250;
const navItems = ['IOS', 'Android', 'UIO'];


const Header =  (props) => {
  const { window } = props
  const [cartCount, setCartCount] = useState(getCartCount()); // Initialize with initial value
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
   const [numProductsToShow, setNumProductsToShow] = useState(20); // Number of products to display initially
  const [numProductsToLoad, setNumProductsToLoad] = useState(20); // Number of products to load when clicking "Load More"


  const filteredProducts = selectedCategory
  ? filterProductsByCategory(selectedCategory, productsData)
  : productsData.slice(0, numProductsToShow);


  const handleLoadMore = () => {
    setNumProductsToShow((prevNum) => prevNum + numProductsToLoad);
  };

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

  const handleAddToCart = () => {
    increaseCartCount();
    setCartCount((prevCartCount) => prevCartCount + 1); // Update the cart count state
    setShowAlert(true); // Show the success alert
    setTimeout(() => setShowAlert(false), 3000);
  };


  // Check if there are more products to load
  const hasMoreProducts = filteredProducts.length < productsData.length;

  // Check if there are less than 20 products on the screen
  const isLessThanTwenty = filteredProducts.length < 20;

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
          <IconButton id='shopping-cart'>
            <Badge badgeContent={cartCount} color="error" >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
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
      <Container id = "product-container">
        <Grid container spacing={4} >
          {filteredProducts.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} 
              cartCount={cartCount} // Pass the cartCount state as prop
              updateCartCount={handleAddToCart}/>
            </Grid>
          ))}
        </Grid>
        {hasMoreProducts && !isLessThanTwenty && (
        <Button variant="contained" color="primary" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
      </Container>
      
      {showAlert && ( // Show the alert conditionally
        <Alert
          id='alert'
          severity="success"
          onClose={() => setShowAlert(false)}
        >
          Item added to cart successfully!
        </Alert>
      )}  
    </Box>
  );
  
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header