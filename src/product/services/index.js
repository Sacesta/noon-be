const Product = require("../Models/Product.model");

const createProduct = async (productPayload) => {
  return Product.create(productPayload);
};

module.exports = { createProduct };
