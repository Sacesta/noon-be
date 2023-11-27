const config = require("config");

const bcrypt = require("bcrypt");
const { SuperAdmin } = require("../Models/admin.model");
const { signJwt } = require("../../utils/jwt");
const { User, Vendor, Customer } = require("../Models/User.model");

const registerAdmin = async (payload) => {
  return User.create(payload);
};

const registerVendor = async (payload) => {
  return Vendor.create(payload);
};

const registerCustomer = async (payload) => {
  return Customer.create(payload);
};

const findUser = async (query, options = {}) => {
  return await User.findOne(query, {}, options).select("+password");
};

// Sign Token
const signToken = async (user) => {
  const access_token = signJwt(
    { sub: user._id, role: user.role },
    "accessTokenPrivateKey",
    {
      expiresIn: `${config.get("accessTokenExpiresIn")}m`,
    }
  );
  return { access_token };
};

const getUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

module.exports = {
  registerAdmin,
  registerCustomer,
  registerVendor,
  findUser,
  signToken,
  getUsers,
};
