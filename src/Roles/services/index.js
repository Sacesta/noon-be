const { Permission } = require("../models/Permissions.model");
const { Role } = require("../models/Role.model");

const createRole = async (rolePayload) => {
  const role = await Role.create(rolePayload);
  return role;
};

const getRoles = async () => {
  const roles = await Role.find({}).populate({ path: "permissions" });
  return roles;
};

const getPermissions = async () => {
  // await Permission.deleteMany();
  const permissions = await Permission.find({});

  return permissions;
};

module.exports = { createRole, getPermissions, getRoles };
