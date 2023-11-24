const AppError = require("../../utils/appError");
const { sendResponse } = require("../../utils/sendResponse");
const { getPermissions, createRole, getRoles } = require("../services");

const getRolesController = async (req, res, next) => {
  try {
    const roles = await getRoles();
    sendResponse(res, roles, "All Roles Fetched Successfully");
  } catch (error) {
    next(new AppError(error.message));
  }
};

const createRoleController = async (req, res, next) => {
  try {
    const { name, permissions } = req.body;
    const role = await createRole({ name, permissions });
    role.save();
    sendResponse(res, role, "Role Created successfully");
  } catch (error) {
    next(new AppError(error.message));
  }
};

const getPermissionsController = async (req, res, next) => {
  try {
    const permissions = await getPermissions();
    sendResponse(res, permissions, "Fetched All permissions");
  } catch (error) {
    next(new AppError(error.message));
  }
};

module.exports = {
  getPermissionsController,
  createRoleController,
  getRolesController,
};
