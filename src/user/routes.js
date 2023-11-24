const express = require("express");
const { deserializeUser } = require("../auth/middleware/deserializeUser");
const { requireUser } = require("../auth/middleware/requireUser");
const { checkAdmin } = require("../auth/middleware/ValidateRoles");
const { validate } = require("../auth/middleware/validate");
const { userSchema } = require("./schemas/user.schema");
const { createUserController, getUsersController } = require("./controller");
const router = express.Router();

router.use(deserializeUser, requireUser, checkAdmin);

router.get("/", getUsersController);
router.post("/user", validate(userSchema), createUserController);

module.exports = router;
