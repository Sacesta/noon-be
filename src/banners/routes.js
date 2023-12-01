const express = require("express");
const multer = require("multer");
const storage = require("../utils/FileStorage.config");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { checkAdmin } = require("../auth/middleware/ValidateRoles");
const {
  createBannerController,
  getAllBannersController,
} = require("./controllers");
const router = express.Router();

const upload = multer(storage.imageConfig);

router.use(deserializeUser, requireUser, checkAdmin);

router.get("/", getAllBannersController);

router.post(
  "/createBanners",
  upload.fields([
    {
      name: "images",
    },
  ]),
  (req, res, next) => {
    if (!req.files) {
      req.files = {};
    }
    if (!req.files["images"]) {
      req.files["images"] = [""];
    }
    next();
  },
  // validate(productSchema),
  createBannerController
);

module.exports = router;
