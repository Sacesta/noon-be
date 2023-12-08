const Product = require("../Models/Product.model");

const createProduct = async (productPayload) => {
  return Product.create(productPayload);
};

const updateProduct = async (productPayload, productId) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    productPayload,
    {
      new: true,
    }
  );
  return updatedProduct;
};

const deleteProduct = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};

const getGalleryImages = async (productId) => {
  return;
};

const getAllProducts = async (userId) => {
  const products = Product.find({});
  return products;
};

module.exports = {
  createProduct,
  getGalleryImages,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
