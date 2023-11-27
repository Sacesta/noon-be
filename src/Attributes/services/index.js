const { Attribute } = require("../models/Attributes.model");

const getAttributes = async () => {
  return Attribute.find();
};

const createAttribute = async (attributePayload) => {
  return Attribute.create(attributePayload);
};

module.exports = { createAttribute, getAttributes };
