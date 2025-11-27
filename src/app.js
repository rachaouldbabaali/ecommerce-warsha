// const express = require('express');
import express from 'express';
import productRoutes from './routes/index.js';
const app = express();

app.use(express.json());

// routes
app.use(productRoutes);

// module.exports = app;
export default app;