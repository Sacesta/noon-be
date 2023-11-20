const express = require("express");
const {
  AdminRegisterationController,
  AdminLoginController,
} = require("./controller/index");
const { deserializeUser } = require("./middleware/deserializeUser");
const { requireUser } = require("./middleware/requireUser");
const {
  superAdminRegistrationSchema,
  superAdminLoginSchema,
} = require("./schemas/superAdmin.schema");
const { validate } = require("./middleware/validate");

const router = express.Router();

// There are 3 types of users, superAdmin, vendors, customer

// SuperAdmin
router.post(
  "/registerAdmin",
  validate(superAdminRegistrationSchema),
  AdminRegisterationController
);
router.post(
  "/loginAdmin",
  validate(superAdminLoginSchema),
  AdminLoginController
);

// This is deserialze middleware it checks for user have valid session and have appropriate tokens.
router.use(deserializeUser, requireUser);

// Protected routes

module.exports = router;
