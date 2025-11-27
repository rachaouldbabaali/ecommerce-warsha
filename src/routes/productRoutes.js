// applicatin url : http://localhost:5000/api/products

import express from 'express';
import { getProducts } from '../controllers/productControllers.js';

const router = express.Router();

router.get ('/', getProducts);   // localhost:5000/api/products/

export default router;