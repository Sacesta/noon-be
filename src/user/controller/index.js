const AppError = require("../../utils/appError");
const _ = require("lodash");
const { excludedFields } = require("../../utils/excludedFields");
const { sendResponse } = require("../../utils/sendResponse");
const { createUser, getUsers } = require("../services");

const getUsersController = async (req, res, next) => {
  try {
    const users = await getUsers();
    sendResponse(res, users, "All users fetched");
  } catch (error) {
    next(new AppError(error.message));
  }
};

const createUserController = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      role_id,
      country_code,
    } = req.body;
    const userPayload = {
      name,
      email,
      phone,
      password,
      confirmPassword,
      role_id,
      country_code,
    };
    if (password !== confirmPassword)
      throw new AppError("Password does not match with confirm password");
    const user = await createUser(userPayload);
    sendResponse(
      res,
      _.omit(user.toObject(), excludedFields),
      "User created successfully"
    );
  } catch (error) {
    next(new AppError(error.message));
  }
};

module.exports = {
  createUserController,
  getUsersController,
};
