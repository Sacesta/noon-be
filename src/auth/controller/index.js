const { uploadImageToAWS } = require("../../aws/services");
const AppError = require("../../utils/appError");
const { excludedFields } = require("../../utils/excludedFields");
const { removeNullOrUndefinedFields } = require("../../utils/misc");
const { sendResponse } = require("../../utils/sendResponse");
const {
  registerAdmin,
  signToken,
  registerVendor,
  registerCustomer,
  findUser,
  getUsers,
} = require("../services");
const _ = require("lodash");

const GetAllUsersController = async (req, res, next) => {
  try {
    const users = await getUsers();
    sendResponse(res, users, "All users fetched successfully");
  } catch (error) {
    next(error);
  }
};

const AdminRegisterationController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await registerAdmin({ email, password, role: "superAdmin" });
    await admin.save();
    const omittedResponse = _.omit(admin.toObject(), excludedFields);
    sendResponse(res, omittedResponse, "Registered successfully");
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
    next(err);
  }
};

const VendorRegistrationController = async (req, res, next) => {
  try {
    const {
      email,
      password,
      category,
      paymentDetails,
      address,
      storeName,
      phone,
    } = req.body;

    const { storeLogo, documentation } = req.files;

    const storeLogoUrl = await uploadImageToAWS(storeLogo[0]);
    const documentationUrl = await uploadImageToAWS(documentation[0]);

    const payload = {
      email,
      password,
      category,
      paymentDetails,
      address,
      storeName,
      phone,
      storeLogo: storeLogoUrl,
      documentation: documentationUrl,
      role: "vendor",
    };
    const vendor = await registerVendor(payload);
    await vendor.save();
    const omittedResponse = _.omit(vendor.toObject(), excludedFields);
    sendResponse(res, omittedResponse, "Registered successfully");
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
    next(err);
  }
};

const CustomerRegistrationController = async (req, res, next) => {
  try {
    const { email, password, name, phone, status } = req.body;
    const payload = {
      email,
      password,
      phone,
      name,
      role: "customer",
      status,
    };
    const cleanPayload = removeNullOrUndefinedFields(payload);
    const vendor = await registerCustomer(cleanPayload);
    await vendor.save();
    const omittedResponse = _.omit(vendor.toObject(), excludedFields);
    sendResponse(res, omittedResponse, "Registered successfully");
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
    next(err);
  }
};

const LoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (!user || !(await user.comparePasswords(user.password, password)))
      return next(new AppError("Invalid Email or password", 401));
    const { access_token } = await signToken(user);

    sendResponse(res, {
      status: "success",
      access_token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  LoginController,
  AdminRegisterationController,
  CustomerRegistrationController,
  VendorRegistrationController,
  GetAllUsersController,
};
