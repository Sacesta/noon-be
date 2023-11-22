const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  values: {
    type: [String],
    required: true,
  },
});

const Attribute = mongoose.model("Atribute", attributeSchema);

module.exports = { Attribute };
