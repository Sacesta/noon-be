const express = require("express");
const multer = require("multer");
const {
  AdminRegisterationController,
  LoginController,
  CustomerRegistrationController,
  VendorRegistrationController,
  GetAllUsersController,
  getUserByIdController,
} = require("./controller/index");
const storage = require("../utils/FileStorage.config");
const { deserializeUser } = require("./middleware/deserializeUser");
const { requireUser } = require("./middleware/requireUser");
const {
  superAdminRegistrationSchema,
  LoginSchema,
  customerSchema,
  vendorSchema,
} = require("./schemas/user.schema");
const { validate } = require("./middleware/validate");
const { checkAdmin } = require("./middleware/ValidateRoles");

// Multer config
const upload = multer(storage.mixConfig);

const router = express.Router();

// There are 3 types of users, superAdmin, vendors, customer

// SuperAdmin
router.post(
  "/registerAdmin",
  validate(superAdminRegistrationSchema),
  AdminRegisterationController
);

// Customer
router.post(
  "/registerCustomer",
  validate(customerSchema),
  CustomerRegistrationController
);

// // Vendor
// router.post(
//   "/registerVendor",
//   upload.fields([
//     { name: "storeLogo", maxCount: 1 },
//     { name: "documentation", maxCount: 1 },
//   ]),
//   (req, res, next) => {
//     // Here check in req.files that storeLogo[0] and documentation[0] is not defined ,if not present then set them with an empty string for now and call next() middleware
//     if (req.files) {
//       if (!req?.files?.["storeLogo"]?.[0]) req.files["storeLogo"] = [""];
//       if (!req?.files?.["documentation"]?.[0])
//         req.files["documentation"] = [""];
//     }

//     next();
//   },
//   validate(vendorSchema),
//   VendorRegistrationController
// );

router.post("/login", validate(LoginSchema), LoginController);

// This is deserialze middleware it checks for user have valid session and have appropriate tokens.
router.use(deserializeUser, requireUser);

router.use(checkAdmin);

router.get("/users", GetAllUsersController);

router.get("/user/:id", getUserByIdController);

// Protected routes

module.exports = router;
