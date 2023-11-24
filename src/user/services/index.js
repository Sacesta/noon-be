const User = require("../models/User.model");

const getUsers = async () => {
  const users = await User.find({})
    .select("-password -confirmPassword")
    .populate({
      path: "role_id",
      populate: {
        path: "permissions",
        model: "Permission",
      },
    });
  return users;
};

const createUser = async (userPayload) => {
  const user = await User.create(userPayload);
  return user;
};

module.exports = { getUsers, createUser };
