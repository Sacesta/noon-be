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
const { productSchema } = require("./schemas/product.schema");
const router = express.Router();

const upload = multer(storage.imageConfig);

router.use(deserializeUser, requireUser, checkVendor);
router.post(
  "/createProduct",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "galleryImages",
    },
  ]),
  (req, res, next) => {
    // Here check in req.files that storeLogo[0] and documentation[0] is not defined ,if not present then set them with an empty string for now and call next() middleware
    if (req.files) {
      if (!req?.files?.["thumbnail"]?.[0]) req.files["thumbnail"] = [""];
      if (!req?.files?.["galleryImages"]?.[0])
        req.files["galleryImages"] = [""];
    }

    next();
  },
  validate(productSchema),
  createBrandController
);

module.exports = router;
