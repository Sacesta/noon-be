const Product = require("../Models/Product.model");

const createProduct = async (productPayload) => {
  return Product.create(productPayload);
};

const getGalleryImages = async (productId) => {
  return;
};

const getVendorProducts = async (userId) => {
  const products = Product.find({ createdBy: userId });
  return products;
};

module.exports = { createProduct, getGalleryImages, getVendorProducts };
