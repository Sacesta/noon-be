const { Category } = require("../Models/Category.model");

const createCategory = async (categoryPayload) => {
  try {
    if (
      !categoryPayload.parentCategory ||
      categoryPayload.parentCategory === "null"
    ) {
      const { parentCategory, ...removedParentCategory } = categoryPayload;
      console.log(removedParentCategory, "Removed parent category");
      return Category.create(removedParentCategory);
    } else {
      return Category.create(categoryPayload);
    }
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (categoryPayload, categoryId) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    categoryPayload,
    { new: true }
  );

  return updatedCategory;
};

const getAllCategories = async () => {
  const categories = await Category.find({});
  return categories;
};

const deleteCategory = async (categoryId) => {
  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  return deleteCategory;
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
