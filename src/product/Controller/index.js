const { uploadImageToAWS, deleteImageFromAWS } = require("../../aws/services");
const AppError = require("../../utils/appError");
const { excludedFields } = require("../../utils/excludedFields");
const { removeNullOrUndefinedFields } = require("../../utils/misc");
const { sendResponse } = require("../../utils/sendResponse");
const {
  createProduct,
  getGalleryImages,
  getVendorProducts,
} = require("../services");
const _ = require("lodash");

const createProductController = async (req, res, next) => {
  try {
    const currentVendor = res.locals.user.sub;
    const {
      name,
      shortDescriptions,
      description,
      type,
      unit,
      weight,
      quantity,
      price,
      salePrice,
      saleStartDate,
      saleEndDate,
      discountPrice,
      discountStartDate,
      discountEndDate,
      isFeatured,
      shippingDays,
      isCod,
      isFreeShipping,
      isSaleEnable,
      isReturn,
      isTrending,
      isApproved,
      sku,
      isRandomRelatedProducts,
      stockStatus,
      metaTitle,
      metaDescription,
      estimatedDeliveryText,
      returnPolicyText,
      safeCheckout,
      secureCheckout,
      socialShare,
      encourageOrder,
      encourageView,
      slug,
      status,
      store,
      taxId,
      ordersCount,
      reviewsCount,
      canReview,
      ratingCount,
      orderAmount,
      reviewRatings,
      relatedProducts,
      crossSellProducts,
      sizeChartImage,
      categories,
      attributes,
      brand,
      videoProvider,
      videoLink,
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
      shortDescriptions: shortDescriptions,
      description: description,
      type: type,
      unit: unit,
      weight: weight,
      quantity: quantity,
      price: price,
      sale: {
        salePrice: salePrice,
        saleDateRange: {
          saleStartDate: saleStartDate,
          saleEndDate: saleEndDate,
        },
      },
      discount: {
        discountPrice: discountPrice,
        discountDateRange: {
          discountStartDate: discountStartDate,
          discountEndDate: discountEndDate,
        },
      },
      isFeatured: isFeatured,
      shippingDays: shippingDays,
      isCod: isCod,
      isFreeShipping: isFreeShipping,
      isSaleEnable: isSaleEnable,
      isReturn: isReturn,
      isTrending: isTrending,
      isApproved: isApproved,
      sku: sku,
      isRandomRelatedProducts: isRandomRelatedProducts,
      stockStatus: stockStatus,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
      thumbnail: {
        url: thumbnailUrl,
      },
      estimatedDeliveryText: estimatedDeliveryText,
      returnPolicyText: returnPolicyText,
      safeCheckout: safeCheckout,
      secureCheckout: secureCheckout,
      socialShare: socialShare,
      encourageOrder: encourageOrder,
      encourageView: encourageView,
      slug: slug,
      status: status,
      store: store,
      createdBy: currentVendor,
      taxId: taxId,
      ordersCount: ordersCount,
      reviewsCount: reviewsCount,
      canReview: canReview,
      ratingCount: ratingCount,
      orderAmount: orderAmount,
      reviewRatings: reviewRatings,
      relatedProducts: relatedProducts,
      crossSellProducts: crossSellProducts,
      sizeChartImage: sizeChartImage,
      categories: categories,
      attributes: attributes,
      brand: brand,
      videoProvider: videoProvider,
      videoLink: videoLink,
      shippingRate: shippingRate,
      galleryImages: galleryImagesUrls,
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
    const prodcutId = req.params.id;
    let galleryImagesUrls = undefined;
    let thumbnailUrl = undefined;
    const {
      name,
      shortDescriptions,
      description,
      type,
      unit,
      weight,
      quantity,
      price,
      salePrice,
      saleStartDate,
      saleEndDate,
      discountPrice,
      discountStartDate,
      discountEndDate,
      isFeatured,
      shippingDays,
      isCod,
      isFreeShipping,
      isSaleEnable,
      isReturn,
      isTrending,
      isApproved,
      sku,
      isRandomRelatedProducts,
      stockStatus,
      metaTitle,
      metaDescription,
      estimatedDeliveryText,
      returnPolicyText,
      safeCheckout,
      secureCheckout,
      socialShare,
      encourageOrder,
      encourageView,
      slug,
      status,
      store,
      createdBy,
      taxId,
      ordersCount,
      reviewsCount,
      canReview,
      ratingCount,
      orderAmount,
      reviewRatings,
      relatedProducts,
      crossSellProducts,
      sizeChartImage,
      categories,
      attributes,
      brand,
      videoProvider,
      videoLink,
      shippingRate,
    } = req.body;
    const { galleryImages, thumbnail } = req.files;

    if (galleryImages) {
      galleryImagesUrls = [];
      const previousGalleryImages = await getGalleryImages(prodcutId);

      for (let image of previousGalleryImages) {
        await deleteImageFromAWS(image.url);
      }
      for (let image of galleryImages) {
        const url = await uploadImageToAWS(image);
        const urlObj = {
          url,
        };
        galleryImagesUrls.push(urlObj);
      }
    }

    if (thumbnail) {
      const previousThumbnail = await getThumbnailByProductId(productId);
      if (previousThumbnail) {
        await deleteImageFromAWS(previousThumbnail.url);
      }
      thumbnailUrl = await uploadImageToAWS(thumbnail[0]);
    }
  } catch (error) {
    next(new AppError(error.message));
  }
};

const GetAllCurrentVendorProductsController = async (req, res, next) => {
  try {
    const userId = res.locals.user.sub;
    const products = await getVendorProducts(userId);

    sendResponse(res, products, "Product created successfully!");
  } catch (error) {
    next(new AppError(error.message));
  }
};

module.exports = {
  createProductController,
  updateProductController,
  GetAllCurrentVendorProductsController,
};
