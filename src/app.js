// const express = require('express');
import express from "express";
import appRoutes from "./routes/index.js";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
const app = express();

app.use(express.json());

app.use(loggerMiddleware);

// routes
app.use(appRoutes);

// 404 handler - middleware for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

// module.exports = app;
export default app;
