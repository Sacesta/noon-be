const { uploadImageToAWS } = require("../../aws/services");
const AppError = require("../../utils/appError");
const { excludedFields } = require("../../utils/excludedFields");
const { sendResponse } = require("../../utils/sendResponse");
const { createProduct } = require("../services");
const _ = require("lodash");

const createProductController = async (req, res, next) => {
  try {
    const {
      name,
      category,
      brand,
      unit,
      unitPrice,
      videoProvider,
      videoLink,
      sku,
      description,
      discountPrice,
      discountStartDate,
      discountEndDate,
      quantity,
      shippingRate,
    } = req.body;
    const galleryImagesUrls = [];

    const { galleryImages, thumbnail } = req.files;

    for (let image of galleryImages) {
      const url = await uploadImageToAWS(image);
      const urlObj = {
        url,
      };
      galleryImagesUrls.push(urlObj);
    }

    const thumbnailUrl = await uploadImageToAWS(thumbnail[0]);

    const payload = {
      name: name,
      category: category,
      brand: brand,
      unit: unit,
      unitPrice: unitPrice,
      galleryImages: galleryImagesUrls,
      thumbnail: thumbnailUrl,
      videoProvider: videoProvider,
      videoLink: videoLink,
      sku: sku,
      description: description,
      discount: {
        discountPrice: discountPrice,
        discountDateRange: {
          discountStartDate: discountStartDate,
          discountEndDate: discountEndDate,
        },
      },
      quantity: quantity,
      shippingRate: shippingRate,
    };
    const product = await createProduct(payload);

    product.save();

    sendResponse(
      res,
      _.omit(product, excludedFields),
      "Product created successfully!"
    );
  } catch (error) {
    next(new AppError(error.message));
  }
};

module.exports = { createProductController };
