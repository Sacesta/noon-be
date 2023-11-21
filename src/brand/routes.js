const express = require("express");
const multer = require("multer");
const storage = require("../utils/FileStorage.config");
const { createBrandController } = require("./Controller");
const { BrandSchema } = require("./schemas/brands.schema");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { checkAdmin, checkVendor } = require("../auth/middleware/ValidateRoles");
const { validate } = require("../auth/middleware/validate");
const AppError = require("../utils/appError");
const router = express.Router();

const upload = multer(storage.imageConfig);

router.use(deserializeUser, requireUser, checkVendor);
router.post(
  "/createBrand",
  upload.single("icon"),
  (req, res, next) => {
    if (!req.file || !(req.file instanceof Object)) {
      return next(new AppError("No file uploaded", 400));
    }
    next();
  },
  validate(BrandSchema),
  createBrandController
);

module.exports = router;
