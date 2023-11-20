const AppError = require("../../utils/appError");
const { excludedFields } = require("../../utils/excludedFields");
const { sendResponse } = require("../../utils/sendResponse");
const { registerAdmin, findAdmin, signToken } = require("../services");
const _ = require("lodash");

const AdminRegisterationController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await registerAdmin({ email, password });
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

const AdminLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await findAdmin({ email });
    if (!admin || !(await admin.comparePasswords(admin.password, password)))
      return next(new AppError("Invalid Email or password", 401));

    const { access_token } = await signToken(admin);

    sendResponse(res, {
      status: "success",
      access_token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { AdminLoginController, AdminRegisterationController };
