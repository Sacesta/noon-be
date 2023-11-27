const AppError = require("../../utils/appError");
const { sendResponse } = require("../../utils/sendResponse");
const { createAttribute, getAttributes } = require("../services");

const createAttributeController = async (req, res, next) => {
  try {
    const { name, values } = req.body;
    const attribute = await createAttribute({ name, values });
    attribute.save();
    sendResponse(res, attribute.toObject(), "Attribute created successfully");
  } catch (error) {
    console.log(error);
    throw new AppError(error.message);
  }
};

const GetAttributesController = async (req, res, next) => {
  try {
    const attributes = await getAttributes();
    sendResponse(res, attributes, "All Attributes fetched successfully");
  } catch (error) {
    throw new AppError(error.message);
  }
};

module.exports = {
  createAttributeController,
  GetAttributesController,
  GetAttributesController,
};
