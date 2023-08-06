// categoryFunctions.js
export function filterProductsByCategory(category, products) {
    return products.filter(product => {
      const firstWordOfOperatingSystem = product.operatingSystem.split(' ')[0]; // Get the first word
      return firstWordOfOperatingSystem.toLowerCase() === category.toLowerCase();
    });
  }
  
  