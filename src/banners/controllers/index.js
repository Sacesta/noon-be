const { uploadImageToAWS, deleteImageFromAWS } = require("../../aws/services");
const AppError = require("../../utils/appError");
const {
  getfileNameFromUrl,
  removeNullOrUndefinedFields,
} = require("../../utils/misc");
const { sendResponse } = require("../../utils/sendResponse");
const Banner = require("../models/banners.model");
const {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
} = require("../services");

const createBannerController = async (req, res, next) => {
  try {
    const imagesUrls = [];

    const { link } = req.body;

    const image = req.file;

    const url = await uploadImageToAWS(image);

    const payload = {
      image: url,
      link: link,
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

const updateBannerController = async (req, res, next) => {
  try {
    const { link } = req.body;
    const newImage = req.file;

    const bannerId = req.params.id;

    const banner = await Banner.findById(bannerId);

    if (!banner) {
      throw new AppError("Banner with this id does not exist");
    }

    let imageUrl = null;

    if (newImage) {
      await deleteImageFromAWS(getfileNameFromUrl(banner.image));
      imageUrl = await uploadImageToAWS(newImage);
    }

    const payload = {
      link,
      image: imageUrl,
    };

    const cleanPayload = removeNullOrUndefinedFields(payload);
    const updatedBanner = await updateBanner(cleanPayload, bannerId);
    sendResponse(res, updatedBanner, "Banner Updated successfully");
  } catch (err) {
    next(err);
  }
};

const deleteBannerController = async (req, res, next) => {
  try {
    const bannerId = req.params.id;

    const banner = await Banner.findById(bannerId);

    if (!banner) {
      throw new AppError("Banner with this id does not exist");
    }

    if (banner.image) {
      deleteImageFromAWS(getfileNameFromUrl(banner.image));
    }
    const deletedBanner = await deleteBanner(bannerId);
    sendResponse(res, deletedBanner, "Banner deleted Successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBannerController,
  getAllBannersController,
  updateBannerController,
  deleteBannerController,
};
