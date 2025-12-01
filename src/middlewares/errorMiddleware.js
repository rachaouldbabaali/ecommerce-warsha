// Error Handling Middleware
// This middleware catches ALL errors from your routes and controllers
// It must be the LAST middleware in app.js

// A simple error handling function
const errorMiddleware = (err, req, res, next) => {
  // Set default status code to 500 (server error) if not provided
  const statusCode = err.statusCode || 500;

  // Set a default error message
  const message = err.message || "Something went wrong!";

  // Log the error to console (so we can see what happened)
  console.error("❌ ERROR:", message);

  // Send error response back to client
  res.status(statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode,
  });
};

export default errorMiddleware;
