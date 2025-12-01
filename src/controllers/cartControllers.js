// Cart Controllers
// These functions handle all shopping cart-related requests

import cart from "../data/mockCartData.js";
import products from "../data/mockproductData.js";

// 1. GET CART
export const getCart = (req, res) => {
  res.json({
    success: true,
    data: cart,
  });
};

// 2. ADD ITEM TO CART
export const addItemToCart = (req, res, next) => {
  const newItem = req.body;

  // Validation: Check if productId and quantity are provided
  if (!newItem.productId || !newItem.quantity) {
    const err = new Error("productId and quantity are required");
    err.statusCode = 400;
    return next(err);
  }

  // Check if product exists
  const product = products.find((p) => p.id === newItem.productId);

  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    return next(err);
  }

  // Check if we have enough stock
  if (newItem.quantity > product.quantity) {
    const err = new Error("Insufficient product quantity");
    err.statusCode = 400;
    return next(err);
  }

  // Check if item already exists in cart
  const existingItem = cart.items.find(
    (item) => item.productId === newItem.productId
  );

  if (existingItem) {
    // If item exists, just increase quantity
    existingItem.quantity += newItem.quantity;
  } else {
    // If new item, add it to cart
    cart.items.push(newItem);
  }

  // Update total price
  cart.totalPrice += product.price * newItem.quantity;

  res.status(201).json({
    success: true,
    message: "Item added to cart",
    data: cart,
  });
};
