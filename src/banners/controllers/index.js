const { uploadImageToAWS } = require("../../aws/services");
const AppError = require("../../utils/appError");
const { sendResponse } = require("../../utils/sendResponse");
const { createBanner, getAllBanners } = require("../services");

const createBannerController = async (req, res, next) => {
  try {
    const imagesUrls = [];

    const { images } = req.files;

    if (!images[0]) throw new AppError("At least one banner image is required");

    for (let image of images) {
      const url = await uploadImageToAWS(image);
      imagesUrls.push(url);
    }

    const payload = {
      images: imagesUrls,
    };

    const banners = await createBanner(payload);

    banners.save();

    sendResponse(res, banners, "Banners created Successfully");
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

const getAllBannersController = async (req, res, next) => {
  try {
    const banners = await getAllBanners();
    sendResponse(res, banners, "All Banners fetched successfully");
  } catch (error) {
    next(new AppError(error.message));
  }
};

module.exports = { createBannerController, getAllBannersController };
