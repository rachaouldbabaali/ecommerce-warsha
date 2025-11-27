// product related controller functions will be here

import products from '../data/mockproductData.js';

const getProducts = (req, res) => {
  res.json(products);
};

export { getProducts };