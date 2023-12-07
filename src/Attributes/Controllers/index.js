const AppError = require("../../utils/appError");
const { removeNullOrUndefinedFields } = require("../../utils/misc");
const { sendResponse } = require("../../utils/sendResponse");
const { Attribute } = require("../models/Attributes.model");
const {
  createAttribute,
  getAttributes,
  deleteAttribute,
  updateAttribute,
} = require("../services");

const createAttributeController = async (req, res, next) => {
  try {
    const { name, values } = req.body;
    const attribute = await createAttribute({ name, values });
    attribute.save();
    sendResponse(res, attribute.toObject(), "Attribute created successfully");
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

const GetAttributesController = async (req, res, next) => {
  try {
    const attributes = await getAttributes();
    sendResponse(res, attributes, "All Attributes fetched successfully");
  } catch (error) {
    next(new AppError(error.message));
  }
};

const updateAttributeController = async (req, res, next) => {
  try {
    const attrId = req.params.id;
    const attr = await Attribute.findById(attrId);

    if (!attr) {
      throw new AppError("No Attribute with this id exists");
    }

    const { name, values } = req.body;
    const payload = { name, values };
    const cleanPayload = removeNullOrUndefinedFields(payload);
    const updatedAttr = await updateAttribute(cleanPayload, attrId);
    sendResponse(res, updatedAttr, "Attribute updated successfully");
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

const deleteAttributeController = async (req, res, next) => {
  try {
    const attrId = req.params.id;
    const attr = await Attribute.findById(attrId);

    if (!attr) {
      throw new AppError("No Attribute with this id exists");
    }

    const deletedAttr = await deleteAttribute(attrId);
    sendResponse(res, deletedAttr, "Attribute deleted successfully");
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

module.exports = {
  createAttributeController,
  GetAttributesController,
  updateAttributeController,
  deleteAttributeController,
};
