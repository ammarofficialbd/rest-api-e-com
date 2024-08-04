// routes/productRoutes.ts
import express from 'express';
import { createProducts, createManyProducts, getAllProducts, getProductById } from '../controllers/productControllers.js'; // Adjust the path as necessary

const router = express.Router();

router.post('/create', createProducts);
router.post('/creates', createManyProducts);
router.get('/get', getAllProducts);
router.get('/get/:id', getProductById);




export default router;
