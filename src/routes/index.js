import express from 'express';
import productRoutes from './productRoutes.js';

const router = express.Router();

router.use('/api/products', productRoutes);


export default router

