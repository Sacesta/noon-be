const express = require("express");
const multer = require("multer");
const storage = require("../utils/FileStorage.config");
const {
  createProductController,
  GetAllCurrentVendorProductsController,
  getAllProductsController,
  deleteProductController,
  updateProductController,
} = require("./Controller");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { checkAdmin } = require("../auth/middleware/ValidateRoles");
const { validate } = require("../auth/middleware/validate");
const { productSchema } = require("./schemas/product.schema");
const router = express.Router();

const upload = multer(storage.imageConfig);

router.use(deserializeUser, requireUser, checkAdmin);
router.post(
  "/createProduct",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
    },
  ]),
  (req, res, next) => {
    if (!req.files) {
      req.files = {};
    }
    if (!req.files["thumbnail"]) {
      req.files["thumbnail"] = [""];
    }
    if (!req.files["images"]) {
      req.files["images"] = [""];
    }
    next();
  },
  // validate(productSchema),
  createProductController
);

router.put(
  "/updateProduct/:id",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
    },
  ]),
  (req, res, next) => {
    if (!req.files) {
      req.files = {};
    }
    if (!req.files["thumbnail"]) {
      req.files["thumbnail"] = [""];
    }
    if (!req.files["images"]) {
      req.files["images"] = [""];
    }
    next();
  },
  // validate(productSchema),
  updateProductController
);

router.get("/getAllProducts", getAllProductsController);

router.delete("/deleteProduct/:id", deleteProductController);

module.exports = router;
