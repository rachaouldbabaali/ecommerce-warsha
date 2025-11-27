// applicatin url : http://localhost:5000/api/products

import express from 'express';
import { getProducts, getProductById } from '../controllers/productControllers.js';

const router = express.Router();

router.get ('/', getProducts);   // localhost:5000/api/products

//re.params.id
router.get('/:id', getProductById); // localhost:5000/api/products/:id

export default router;