const Banner = require("../models/banners.model");

const getAllBanners = async () => {
  const banners = await Banner.find({});
  return banners;
};

const createBanner = async (payload) => {
  return Banner.create(payload);
};

const updateBanner = async (payload, bannerId) => {
  const updatedBanner = await Banner.findByIdAndUpdate(bannerId, payload, {
    new: true,
  });

  return updatedBanner;
};

const deleteBanner = async (bannerId) => {
  const deletedBanner = await Banner.findByIdAndDelete(bannerId);
  return deletedBanner;
};

module.exports = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};
