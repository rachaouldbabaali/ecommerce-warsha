// const express = require('express');
import express from "express";
import appRoutes from "./routes/index.js";
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
const app = express();

app.use(express.json());

app.use(loggerMiddleware);


// routes
app.use(appRoutes);


// module.exports = app;
export default app;
