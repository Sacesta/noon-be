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

module.exports = { createCategory };
