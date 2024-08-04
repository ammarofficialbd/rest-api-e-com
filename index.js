import express from 'express';
import dotenv from 'dotenv';
import productRouter from './src/routes/productRoutes.js'; // Adjust the path as necessary
import main from './src/db/db.config.js';

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Mount the product routes
app.use('/api/v1/products', productRouter);

// Add a default route for /api/v1
app.get('/api/v1', (_req, res) => {
  res.send('API is working');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  main()
  console.log(`Server is running on port ${PORT}`);
});
