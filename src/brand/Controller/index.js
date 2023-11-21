const { uploadImageToAWS } = require("../../aws/services");
const { sendResponse } = require("../../utils/sendResponse");
const { createBrand } = require("../services");

const createBrandController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const icon = req.file;
    const iconUrl = await uploadImageToAWS(icon);
    const payload = {
      name,
      icon: iconUrl,
    };
    const brand = await createBrand(payload);
    sendResponse(res, brand, "Brand Created successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { createBrandController };
