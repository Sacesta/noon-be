const express = require("express");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { checkVendor, checkAdmin } = require("../auth/middleware/ValidateRoles");
const { validate } = require("../auth/middleware/validate");
const { AttributeSchema } = require("./schemas/attribute.schema");
const {
  createAttributeController,
  GetAttributesController,
} = require("./Controllers");
const router = express.Router();

router.use(deserializeUser, requireUser, checkAdmin);
router.get("/", GetAttributesController);

router.post(
  "/createAttribute",
  validate(AttributeSchema),
  createAttributeController
);

module.exports = router;
