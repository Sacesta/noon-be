const { Store } = require("../models/store.model");

const getAllStores = async () => {
  const stores = await Store.find({}).select("-password");
  return stores;
};

const registerStore = async (payload) => {
  return Store.create(payload);
};

module.exports = { registerStore, getAllStores };
