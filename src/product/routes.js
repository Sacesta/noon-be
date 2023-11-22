const express = require("express");
const multer = require("multer");
const storage = require("../utils/FileStorage.config");
const { createProductController } = require("./Controller");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { checkVendor } = require("../auth/middleware/ValidateRoles");
const { validate } = require("../auth/middleware/validate");
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
    if (!req.files) {
      req.files = {};
    }
    if (!req.files["thumbnail"]) {
      req.files["thumbnail"] = [""];
    }
    if (!req.files["galleryImages"]) {
      req.files["galleryImages"] = [""];
    }
    next();
  },
  // validate(productSchema),
  createProductController
);

module.exports = router;
