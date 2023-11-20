const express = require("express");
const router = express.Router();
const multer = require("multer");

const { CreateCategoryController } = require("./Controller/index");

const storage = require("../utils/FileStorage.config");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { categorySchema } = require("./schemas/category.schema");
const { validate } = require("../auth/middleware/validate");
const AppError = require("../utils/appError");

// Multer config
const upload = multer(storage.fileConfig);

router.use(deserializeUser, requireUser);

router.post(
  "/createCategory",
  upload.single("icon"),
  (req, res, next) => {
    if (!req.file || !(req.file instanceof Object)) {
      return next(new AppError("No file uploaded", 400));
    }
    next();
  },
  validate(categorySchema),
  CreateCategoryController
);

module.exports = router;
