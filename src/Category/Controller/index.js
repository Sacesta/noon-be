const { uploadImageToAWS } = require("../../aws/services");
const AppError = require("../../utils/appError");
const { sendResponse } = require("../../utils/sendResponse");
const { createCategory } = require("../Services");

const CreateCategoryController = async (req, res, next) => {
  try {
    const { name, parentCategory } = req.body;
    const iconImage = req.file;

    console.log(parentCategory);

    const iconUrl = await uploadImageToAWS(iconImage);

    const category = await createCategory({
      name,
      parentCategory,
      icon: iconUrl,
    });
    await category.save();
    sendResponse(res, category.toObject(), "Category created successfully");
  } catch (error) {
    console.log(error);
    throw new AppError(error.message);
  }
};

module.exports = { CreateCategoryController };
