const { uploadImageToAWS, deleteImageFromAWS } = require("../../aws/services");
const AppError = require("../../utils/appError");
const { excludedFields } = require("../../utils/excludedFields");
const {
  removeNullOrUndefinedFields,
  getfileNameFromUrl,
} = require("../../utils/misc");
const { sendResponse } = require("../../utils/sendResponse");
const Product = require("../Models/Product.model");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
} = require("../services");
const _ = require("lodash");

const createProductController = async (req, res, next) => {
  try {
    const currentVendor = res.locals.user.sub;
    const {
      name,
      shortDescription,
      description,
      store,
      attribute,
      stockStatus,
      sku,
      stockQuantity,
      price,
      salePrice,
      saleStatus,
      discount,
      startDate,
      endDate,
      categories,
      freeShipping,
    } = req.body;
    const imageUrls = [];

    const { images, thumbnail } = req.files;

    if (images[0]) {
      for (let image of images) {
        const url = await uploadImageToAWS(image);

        imageUrls.push(url);
      }
    }
    let thumbnailUrl = "";
    if (thumbnail[0]) {
      thumbnailUrl = await uploadImageToAWS(thumbnail[0]);
    }

    const payload = {
      name,
      shortDescription,
      description,
      store,
      attribute,
      stockStatus,
      sku,
      stockQuantity,
      price,
      salePrice,
      saleStatus,
      discount,
      startDate,
      endDate,
      categories,
      freeShipping,
      thumbnail: thumbnailUrl,
      images: imageUrls,
    };

    const cleanPayload = removeNullOrUndefinedFields(payload);

    const product = await createProduct(cleanPayload);

    product.save();

    sendResponse(
      res,
      _.omit(product, excludedFields),
      "Product created successfully!"
    );
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

const updateProductController = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).lean();
    if (!product) {
      throw new AppError("No Product with this id exist");
    }

    let imageUrls = undefined;
    let thumbnailUrl = undefined;
    const {
      name,
      shortDescription,
      description,
      store,
      attribute,
      stockStatus,
      sku,
      stockQuantity,
      price,
      salePrice,
      saleStatus,
      discount,
      startDate,
      endDate,
      categories,
      freeShipping,
    } = req.body;
    const { images, thumbnail } = req.files;

    if (images[0]) {
      imageUrls = [];
      const previousGalleryImages = product.images;

      for (let image of previousGalleryImages) {
        await deleteImageFromAWS(getfileNameFromUrl(image));
      }
      for (let image of images) {
        const url = await uploadImageToAWS(image);

        imageUrls.push(url);
      }
    }

    if (thumbnail[0]) {
      const previousThumbnail = product.thumbnail;
      if (previousThumbnail) {
        await deleteImageFromAWS(getfileNameFromUrl(previousThumbnail));
      }
      thumbnailUrl = await uploadImageToAWS(thumbnail[0]);
    }

    const payload = {
      name,
      shortDescription,
      description,
      store,
      attribute,
      stockStatus,
      sku,
      stockQuantity,
      price,
      salePrice,
      saleStatus,
      discount,
      startDate,
      endDate,
      categories,
      freeShipping,
      thumbnail: thumbnailUrl,
      images: imageUrls,
    };

    const cleanPayload = removeNullOrUndefinedFields(payload);
    const updatedProduct = await updateProduct(cleanPayload, productId);
    sendResponse(res, updatedProduct, "Product Upated successfully");
  } catch (error) {
    next(new AppError(error.message));
  }
};

const deleteProductController = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).lean();
    if (!product) {
      throw new AppError("No Product with this id exist");
    }

    const previousImages = product.images;

    for (let image of previousImages) {
      await deleteImageFromAWS(getfileNameFromUrl(image));
    }

    const previousThumbnail = product.thumbnail;
    if (previousThumbnail) {
      await deleteImageFromAWS(getfileNameFromUrl(previousThumbnail));
    }

    const deletedProduct = await deleteProduct(productId);
    sendResponse(res, deletedProduct, "Product deleted successfully");
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

const getAllProductsController = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    sendResponse(res, products, "All Products fetched succssfully");
  } catch (error) {
    next(new AppError(error.message));
  }
};

module.exports = {
  createProductController,
  updateProductController,
  getAllProductsController,
  deleteProductController,
};
