let cartCount = 0;
export const increaseCartCount = () => {
  cartCount += 1;
};

export const getCartCount = () => {
  return cartCount;
};