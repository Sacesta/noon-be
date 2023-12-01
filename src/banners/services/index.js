const Banner = require("../models/banners.model");

const getAllBanners = async () => {
  const banners = await Banner.find({});
  return banners;
};

const createBanner = async (payload) => {
  return Banner.create(payload);
};

module.exports = {
  createBanner,
  getAllBanners,
};
