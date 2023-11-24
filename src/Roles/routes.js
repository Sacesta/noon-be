const express = require("express");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { checkAdmin } = require("../auth/middleware/ValidateRoles");
const { validate } = require("../auth/middleware/validate");
const {
  getPermissionsController,
  createRoleController,
  getRolesController,
} = require("./controller");
const router = express.Router();

router.use(deserializeUser, requireUser, checkAdmin);

router.get("/", getRolesController);

router.get("/permissions", getPermissionsController);
router.post("/role", createRoleController);

module.exports = router;
