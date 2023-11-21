const { Attribute } = require("../models/Attributes.model");

const createAttribute = async (attributePayload) => {
  return Attribute.create(attributePayload);
};

module.exports = { createAttribute };
