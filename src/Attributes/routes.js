const express = require("express");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { checkVendor } = require("../auth/middleware/ValidateRoles");
const { validate } = require("../auth/middleware/validate");
const { AttributeSchema } = require("./schemas/attribute.schema");
const { createAttributeController } = require("./Controllers");
const router = express.Router();

router.use(deserializeUser, requireUser, checkVendor);
router.post(
  "/createAttribute",
  validate(AttributeSchema),
  createAttributeController
);

module.exports = router;
