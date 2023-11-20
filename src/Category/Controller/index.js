const { uploadImageToAWS } = require("../../aws/services");
const { createCategory } = require("../Services");

const CreateCategoryController = async (req, res, next) => {
  try {
    const { name, parentCategory } = req.body;
    const iconImage = req.file;

    const iconUrl = await uploadImageToAWS(iconImage);

    const category = await createCategory({
      name,
      parentCategory,
      icon: iconUrl,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { CreateCategoryController };
