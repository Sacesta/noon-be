const { Attribute } = require("../models/Attributes.model");

const getAttributes = async () => {
  return Attribute.find();
};

const createAttribute = async (attributePayload) => {
  return Attribute.create(attributePayload);
};

const updateAttribute = async (attributePayload, attrId) => {
  const updatedAttr = await Attribute.findByIdAndUpdate(
    attrId,
    attributePayload,
    { new: true }
  );
  return updatedAttr;
};

const deleteAttribute = async (attrId) => {
  const deletedAttrr = await Attribute.findByIdAndDelete(attrId);
  return deletedAttrr;
};

module.exports = {
  createAttribute,
  getAttributes,
  updateAttribute,
  deleteAttribute,
};
