// product related controller functions will be here

import products from "../data/mockproductData.js";

const getProducts = (req, res) => {
  res.json(products);
};

// get product by id
const getProductById = (req, res) => {
  const productId = parseInt(req.params.id); // get id from url params
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};


export { getProducts, getProductById };