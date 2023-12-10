const { uploadImageToAWS, deleteImageFromAWS } = require("../../aws/services");
const AppError = require("../../utils/appError");
const {
  getfileNameFromUrl,
  removeNullOrUndefinedFields,
} = require("../../utils/misc");
const { sendResponse } = require("../../utils/sendResponse");
const { Category } = require("../Models/Category.model");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("../Services");

const CreateCategoryController = async (req, res, next) => {
  try {
    const { name, parentCategory, status } = req.body;
    const iconImage = req.file;

    console.log(parentCategory);

    const iconUrl = await uploadImageToAWS(iconImage);

    const category = await createCategory({
      name,
      parentCategory,
      status,
      image: iconUrl,
    });
    await category.save();
    sendResponse(res, category.toObject(), "Category created successfully");
  } catch (error) {
    console.log(error);
    throw new AppError(error.message);
  }
};

const updateCategoryController = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const prevCategory = await Category.findById(categoryId);

    if (!prevCategory) {
      throw new AppError("No category with that id exist");
    }

    const { name, parentCategory, status } = req.body;
    const iconImage = req.file;

    let imageUrl;

    if (iconImage) {
      await deleteImageFromAWS(getfileNameFromUrl(prevCategory.image));
      imageUrl = await uploadImageToAWS(iconImage);
    }

    const payload = {
      name,
      parentCategory,
      status,
      image: imageUrl,
    };

    const cleanPayload = removeNullOrUndefinedFields(payload);
    const updatedCategory = await updateCategory(cleanPayload, categoryId);
    sendResponse(res, updatedCategory, "Category Updated successfully");
  } catch (error) {
    console.log(error);
    throw new AppError(error.message);
  }
};

const getAllCategoriesController = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    sendResponse(res, categories, "All categories fetched successfully");
  } catch (error) {
    next(new AppError(error.message));
  }
};

const deleteCategoryController = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const prevCategory = await Category.findById(categoryId);

    if (!prevCategory) {
      throw new AppError("No category with that id exist");
    }

    if (prevCategory.icon) {
      await deleteImageFromAWS(getfileNameFromUrl(prevCategory.icon));
    }

    if (prevCategory.image) {
      await deleteImageFromAWS(getfileNameFromUrl(prevCategory.image));
    }

    const deletedCategory = await deleteCategory(categoryId);
    sendResponse(res, deletedCategory, "Category deleted Successfully");
  } catch (error) {
    next(new AppError(error.message));
  }
};

const getCategoryByIdController = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId).lean();
    if (!category) {
      throw new AppError("No Category exist with that id");
    }
    sendResponse(res, category, "Category fetched successfully");
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

const subCategoriesController = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    if (!categoryId) {
      throw new AppError("CategoryId required");
    }
    const subCategories = await Category.find({
      parentCategory: categoryId,
    }).lean();

    sendResponse(res, subCategories, "All subcategories fetched");
  } catch (error) {
    next(new AppError(error.message));
  }
};

module.exports = {
  CreateCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  subCategoriesController,
};
