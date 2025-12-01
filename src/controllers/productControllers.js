// Product Controllers
// These functions handle all product-related requests

import products from "../data/mockproductData.js";

// 1. GET ALL PRODUCTS
const getProducts = (req, res) => {
  res.json({
    success: true,
    data: products,
  });
};

// 2. GET SINGLE PRODUCT BY ID
const getProductById = (req, res, next) => {
  // Get the ID from the URL (e.g., /products/1)
  const productId = parseInt(req.params.id);

  // Find the product with this ID
  const product = products.find((p) => p.id === productId);

  // If product exists, send it
  if (product) {
    res.json({
      success: true,
      data: product,
    });
  } else {
    // If not found, create an error and pass it to errorMiddleware
    const err = new Error("Product not found");
    err.statusCode = 404;
    next(err);
  }
};

// 3. ADD A NEW PRODUCT
const addProduct = (req, res, next) => {
  const newProduct = req.body;

  // Validation: Check if name exists
  if (!newProduct.name) {
    const err = new Error("Product name is required");
    err.statusCode = 400;
    return next(err);
  }

  // Validation: Check if price exists
  if (!newProduct.price) {
    const err = new Error("Product price is required");
    err.statusCode = 400;
    return next(err);
  }

  // Validation: Check if category exists
  if (!newProduct.category) {
    const err = new Error("Product category is required");
    err.statusCode = 400;
    return next(err);
  }

  // Validation: Check if price is a number
  if (isNaN(newProduct.price)) {
    const err = new Error("Product price must be a number");
    err.statusCode = 400;
    return next(err);
  }

  // Validation: Check description length (if provided)
  if (newProduct.description && newProduct.description.length > 200) {
    const err = new Error(
      "Product description must be less than 200 characters"
    );
    err.statusCode = 400;
    return next(err);
  }

  // Set product ID (using array length + 1)
  newProduct.id = products.length + 1;

  // Add the new product to the array
  products.push(newProduct);

  // Send success response with the new product
  res.status(201).json({
    success: true,
    message: "Product added successfully",
    data: newProduct,
  });
};

// 4. UPDATE A PRODUCT
const updateProduct = (req, res, next) => {
  const productId = parseInt(req.params.id);

  // Find the product index
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    return next(err);
  }

  // Get the fields to update from request body
  const { name, price, description, category } = req.body;

  // Update only the fields that are provided
  if (name) products[productIndex].name = name;

  if (price) {
    if (isNaN(price)) {
      const err = new Error("Product price must be a number");
      err.statusCode = 400;
      return next(err);
    }
    products[productIndex].price = price;
  }

  if (description) products[productIndex].description = description;
  if (category) products[productIndex].category = category;

  res.json({
    success: true,
    message: "Product updated successfully",
    data: products[productIndex],
  });
};

// 5. DELETE A PRODUCT
const deleteProduct = (req, res, next) => {
  const productId = parseInt(req.params.id);

  // Find the product index
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    return next(err);
  }

  // Remove the product from array (splice removes 1 item starting at productIndex)
  products.splice(productIndex, 1);

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
};

// 6. GET PRODUCTS BY CATEGORY
const getProductsByCategory = (req, res, next) => {
  // Get category from URL params and convert to lowercase
  const category = req.params.category.toLowerCase();

  // Filter products that match the category
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === category
  );

  if (filteredProducts.length === 0) {
    const err = new Error("No products found in this category");
    err.statusCode = 404;
    return next(err);
  }

  res.json({
    success: true,
    data: filteredProducts,
  });
};

// Export all functions so routes can use them
export {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
