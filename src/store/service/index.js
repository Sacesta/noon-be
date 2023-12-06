const { Store } = require("../models/store.model");

const getAllStores = async () => {
  const stores = await Store.find({}).select("-password");
  return stores;
};

const registerStore = async (payload) => {
  return Store.create(payload);
};

const updateStore = async (payload, storeId) => {
  const updatedStore = await Store.findByIdAndUpdate(storeId, payload, {
    new: true,
  });
  return updatedStore;
};

const deleteStore = async (storeId) => {
  const deletedStore = await Store.findByIdAndDelete(storeId);
  return deletedStore;
};

module.exports = { registerStore, getAllStores, updateStore, deleteStore };
