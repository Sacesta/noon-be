const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  CreateCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  subCategoriesController,
} = require("./Controller/index");

const storage = require("../utils/FileStorage.config");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { categorySchema } = require("./schemas/category.schema");
const { validate } = require("../auth/middleware/validate");
const AppError = require("../utils/appError");

// Multer config
const upload = multer(storage.imageConfig);

router.use(deserializeUser, requireUser);

router.get("/getAllCategories", getAllCategoriesController);

router.post(
  "/createCategory",
  upload.single("image"),
  (req, res, next) => {
    if (!req.file || !(req.file instanceof Object)) {
      return next(new AppError("No file uploaded", 400));
    }
    next();
  },
  validate(categorySchema),
  CreateCategoryController
);

router.put(
  "/updateCategory/:id",
  upload.single("image"),
  updateCategoryController
);

router.delete("/deleteCategory/:id", deleteCategoryController);

router.get("/getCategory/:id", getCategoryByIdController);

router.get("/subcategories", subCategoriesController);

module.exports = router;
