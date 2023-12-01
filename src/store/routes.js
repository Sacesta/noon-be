const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createStoreController,
  getAllStoresController,
} = require("./controller");
const { checkAdmin } = require("../auth/middleware/ValidateRoles");
const { requireUser } = require("../auth/middleware/requireUser");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { validate } = require("../auth/middleware/validate");
const { storeSchema } = require("./schemas/store.schema");
const storage = require("../utils/FileStorage.config");

router.use(deserializeUser, requireUser, checkAdmin);

// Multer config
const upload = multer(storage.mixConfig);

// Vendor

router.get("/", getAllStoresController);

router.post(
  "/createStore",
  upload.fields([
    { name: "storeLogo", maxCount: 1 },
    { name: "documentation", maxCount: 1 },
  ]),
  (req, res, next) => {
    // Here check in req.files that storeLogo[0] and documentation[0] is not defined ,if not present then set them with an empty string for now and call next() middleware
    if (req.files) {
      if (!req?.files?.["storeLogo"]?.[0]) req.files["storeLogo"] = [""];
      if (!req?.files?.["documentation"]?.[0])
        req.files["documentation"] = [""];
    }

    next();
  },
  validate(storeSchema),
  createStoreController
);

module.exports = router;
