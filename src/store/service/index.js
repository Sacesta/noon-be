const { Store } = require("../models/store.model");

const registerStore = async (payload) => {
  return Store.create(payload);
};

module.exports = { registerStore };
