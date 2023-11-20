const Category = require("../Models/Category.model");

const createCategory = async (category) => {
  return Category.create(category);
};

module.exports = { createCategory };
