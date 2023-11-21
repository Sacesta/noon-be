const { Brand } = require("../Models/Brand.model");

const createBrand = async (brandPayload) => {
  return Brand.create(brandPayload);
};

module.exports = { createBrand };
