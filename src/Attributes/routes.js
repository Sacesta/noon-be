const express = require("express");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { checkVendor } = require("../auth/middleware/ValidateRoles");
const { validate } = require("../auth/middleware/validate");
const { AttributeSchema } = require("./schemas/attribute.schema");
const {
  createAttributeController,
  GetAttributesController,
} = require("./Controllers");
const router = express.Router();

router.get("/", GetAttributesController);

router.use(deserializeUser, requireUser, checkVendor);

router.post(
  "/createAttribute",
  validate(AttributeSchema),
  createAttributeController
);

module.exports = router;
