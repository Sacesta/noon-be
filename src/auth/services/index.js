const config = require("config");

const bcrypt = require("bcrypt");
const { SuperAdmin } = require("../Models/admin.model");
const { signJwt } = require("../../utils/jwt");

const registerAdmin = async (payload) => {
  return SuperAdmin.create(payload);
};

const findAdmin = async (query, options = {}) => {
  return await SuperAdmin.findOne(query, {}, options).select("+password");
};

// Sign Token
const signToken = async (admin) => {
  const access_token = signJwt({ sub: admin._id }, "accessTokenPrivateKey", {
    expiresIn: `${config.get("accessTokenExpiresIn")}m`,
  });
  return { access_token };
};

module.exports = { registerAdmin, findAdmin, signToken };
