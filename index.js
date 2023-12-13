const express = require('express'); 
const app = express();

// Import routers
const ecommerceRoutes = require('./ecommerceRoutes'); 
const passwordStrengthRoutes = require('./passwordStrengthRoutes');

// Mount the routers at specific paths 
app.use('/ecommerce', ecommerceRoutes);
app.use('/password-strength', passwordStrengthRoutes);

app.listen(3000, () => {
console.log('Server running on port 3000');
});
