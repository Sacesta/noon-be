const Product = require("../Models/Product.model");

const createProduct = async (productPayload) => {
  return Product.create(productPayload);
};

const getGalleryImages = async (productId) => {
  return;
};

module.exports = { createProduct, getGalleryImages };
