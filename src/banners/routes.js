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
const AppError = require("../utils/appError");
const router = express.Router();

const upload = multer(storage.imageConfig);

router.use(deserializeUser, requireUser, checkAdmin);

router.get("/", getAllBannersController);

router.post(
  "/createBanners",
  upload.single("image"),
  (req, res, next) => {
    if (!req.file) throw new AppError("Banner Image is required");
    next();
  },
  // validate(productSchema),
  createBannerController
);

module.exports = router;
